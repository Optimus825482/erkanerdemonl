"use server";

import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import crypto from "node:crypto";

// --- Public actions ---

const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.email().max(120),
  subject: z.string().max(200).optional().default("İletişim Formu Mesajı"),
  message: z.string().min(10).max(5000),
});

export async function submitContact(formData: FormData) {
  const parsed = ContactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject") || "",
    message: formData.get("message"),
  });
  if (!parsed.success) {
    return { ok: false, error: "Lütfen tüm alanları doğru şekilde doldurun." };
  }
  await prisma.contactMessage.create({
    data: {
      ...parsed.data,
      ipAddress: null,
      userAgent: null,
    },
  });
  revalidatePath("/admin/messages");
  return { ok: true };
}

const SubscribeSchema = z.object({ email: z.email().max(120) });

export async function subscribeNewsletter(formData: FormData) {
  const parsed = SubscribeSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { ok: false, error: "Geçerli bir e-posta girin." };
  }
  const email = parsed.data.email.toLowerCase();
  const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });
  if (existing) {
    if (existing.isActive) {
      return { ok: true, message: "Zaten abonesiniz." };
    }
    await prisma.newsletterSubscriber.update({
      where: { id: existing.id },
      data: { isActive: true },
    });
    return { ok: true, message: "Abonelik yeniden aktifleştirildi." };
  }
  await prisma.newsletterSubscriber.create({
    data: {
      email,
      unsubscribeToken: crypto.randomBytes(32).toString("hex"),
    },
  });
  return { ok: true, message: "Başarıyla abone olundu." };
}

// --- Admin auth ---

import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

const SESSION_COOKIE = "admin_session";

export async function loginAction(formData: FormData): Promise<void> {
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");
  const user = await prisma.user.findFirst({
    where: { OR: [{ username }, { email: username }], isActive: true },
  });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    // Hata durumu — Next.js redirect() ile yönlendir
    redirect("/admin/login?error=1");
  }
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  });
  (await cookies()).set(SESSION_COOKIE, String(user.id), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
  });
  redirect("/admin");
}

export async function logoutAction() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}

export async function getCurrentUser() {
  const c = (await cookies()).get(SESSION_COOKIE);
  if (!c) return null;
  const id = Number(c.value);
  if (!Number.isFinite(id)) return null;
  return prisma.user.findUnique({ where: { id } });
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  return user;
}
