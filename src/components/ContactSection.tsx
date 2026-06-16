"use client";

import { useState, useTransition } from "react";
import { submitContact, subscribeNewsletter } from "@/lib/actions";
import toast from "react-hot-toast";

export default function ContactSection() {
  return (
    <div className="space-y-12">
      <ContactForm />
      <NewsletterForm />
    </div>
  );
}

function ContactForm() {
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<{
    type: "success" | "error" | "warning";
    text: string;
  } | null>(null);

  return (
    <form
      action={(fd) =>
        start(async () => {
          const res = await submitContact(fd);
          if (res.ok) {
            setMsg({
              type: "success",
              text: "Mesajınız gönderildi. En kısa sürede dönüş yapılacak.",
            });
            toast.success("Mesaj gönderildi");
            (document.getElementById("contact-form") as HTMLFormElement | null)?.reset();
          } else {
            setMsg({
              type: "error",
              text: res.error ?? "Bir hata oluştu.",
            });
            toast.error(res.error ?? "Hata");
          }
        })
      }
      id="contact-form"
      className="border border-foreground/15 p-6 sm:p-8 bg-background/50 backdrop-blur-sm"
    >
      <div className="flex items-baseline gap-3 mb-6 pb-4 border-b border-foreground/10">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Form
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          /
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest">
          Contact
        </span>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="name"
              className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2"
            >
              İsim
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              minLength={2}
              maxLength={100}
              placeholder="Ad Soyad"
              className="w-full bg-background border border-foreground/20 px-4 py-3 font-mono text-sm focus:border-foreground focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2"
            >
              E-posta
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={120}
              placeholder="ornek@mail.com"
              className="w-full bg-background border border-foreground/20 px-4 py-3 font-mono text-sm focus:border-foreground focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2"
          >
            Konu (opsiyonel)
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            maxLength={200}
            placeholder="Proje teklifi, iş birliği, ..."
            className="w-full bg-background border border-foreground/20 px-4 py-3 font-mono text-sm focus:border-foreground focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2"
          >
            Mesaj
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            minLength={10}
            maxLength={5000}
            placeholder="Mesajınız..."
            className="w-full bg-background border border-foreground/20 px-4 py-3 font-mono text-sm focus:border-foreground focus:outline-none transition-colors resize-y"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="font-mono text-[10px] text-muted-foreground">
            {`> ready to transmit`}
          </p>
          <button
            type="submit"
            disabled={pending}
            className="font-mono text-xs uppercase tracking-widest px-6 py-3 bg-foreground text-background hover:bg-[var(--accent)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? "Gönderiliyor..." : "Gönder →"}
          </button>
        </div>

        {msg && (
          <div
            className={`text-sm font-mono px-4 py-3 border ${
              msg.type === "success"
                ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/5"
                : msg.type === "warning"
                  ? "border-yellow-500/50 text-yellow-400 bg-yellow-500/5"
                  : "border-[var(--accent)]/50 text-[var(--accent)] bg-[var(--accent)]/5"
            }`}
          >
            {msg.type === "success" ? "✓ " : msg.type === "warning" ? "⚠ " : "✕ "}
            {msg.text}
          </div>
        )}
      </div>
    </form>
  );
}

function NewsletterForm() {
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <div className="border border-foreground/15 p-6 sm:p-8 text-center">
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
        Newsletter
      </div>
      <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
        Bültene abone ol
      </h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
        Yeni yazılardan haberdar olmak için e-posta adresini bırak.
      </p>
      <form
        action={(fd) =>
          start(async () => {
            const res = await subscribeNewsletter(fd);
            if (res.ok) {
              setMsg(res.message ?? "Abone olundu");
              toast.success(res.message ?? "Abone olundu");
            } else {
              setMsg(res.error ?? "Bir hata oluştu");
              toast.error(res.error ?? "Hata");
            }
          })
        }
        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      >
        <input
          name="email"
          type="email"
          required
          placeholder="ornek@mail.com"
          className="flex-1 bg-background border border-foreground/20 px-4 py-3 font-mono text-sm focus:border-foreground focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          className="font-mono text-xs uppercase tracking-widest px-6 py-3 border border-foreground hover:bg-foreground hover:text-background transition-colors disabled:opacity-50"
        >
          {pending ? "..." : "Abone Ol →"}
        </button>
      </form>
      {msg && (
        <p className="mt-3 text-xs font-mono text-muted-foreground">{msg}</p>
      )}
    </div>
  );
}
