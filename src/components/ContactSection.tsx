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
      id="contact-form"
      action={(fd) =>
        start(async () => {
          const res = await submitContact(fd);
          if (res.ok) {
            setMsg({
              type: "success",
              text: "Mesajınız gönderildi. En kısa sürede dönüş yapılacak.",
            });
            toast.success("Mesaj gönderildi");
            (
              document.getElementById("contact-form") as HTMLFormElement | null
            )?.reset();
          } else {
            setMsg({
              type: "error",
              text: res.error ?? "Bir hata oluştu.",
            });
            toast.error(res.error ?? "Hata");
          }
        })
      }
      className="space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Field
          label="İsim"
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={100}
          placeholder="Ad Soyad"
        />
        <Field
          label="E-posta"
          name="email"
          type="email"
          required
          maxLength={120}
          placeholder="ornek@mail.com"
        />
      </div>

      <Field
        label="Konu (opsiyonel)"
        name="subject"
        type="text"
        maxLength={200}
        placeholder="Proje teklifi, iş birliği, ..."
      />

      <FieldTextarea
        label="Mesaj"
        name="message"
        required
        minLength={10}
        maxLength={5000}
        placeholder="Mesajınız..."
        rows={6}
      />

      <div className="flex items-center justify-between border-t border-black pt-6">
        <span className="font-mono text-xs uppercase tracking-widest text-black/40">
          → submit
        </span>
        <button
          type="submit"
          disabled={pending}
          className="btn btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {pending ? "Gönderiliyor…" : "Gönder →"}
        </button>
      </div>

      {msg && (
        <div
          className={`text-sm font-mono border-l-2 pl-3 py-2 ${
            msg.type === "success"
              ? "border-black text-black bg-black/5"
              : msg.type === "warning"
                ? "border-black text-black bg-black/5"
                : "border-[#e63946] text-[#e63946] bg-[#e63946]/5"
          }`}
        >
          {msg.type === "success" ? "✓ " : msg.type === "warning" ? "⚠ " : "✕ "}
          {msg.text}
        </div>
      )}
    </form>
  );
}

function Field({
  label,
  ...props
}: {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label
        htmlFor={props.name}
        className="label block mb-2"
      >
        {label}
      </label>
      <input
        id={props.name}
        {...props}
        className="w-full bg-white border-0 border-b-2 border-black px-0 py-3 font-display text-lg focus:outline-none focus:border-[#e63946] transition-colors placeholder:text-black/30"
      />
    </div>
  );
}

function FieldTextarea({
  label,
  ...props
}: {
  label: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label
        htmlFor={props.name}
        className="label block mb-2"
      >
        {label}
      </label>
      <textarea
        id={props.name}
        {...props}
        className="w-full bg-white border-0 border-b-2 border-black px-0 py-3 font-display text-lg focus:outline-none focus:border-[#e63946] transition-colors resize-none placeholder:text-black/30"
      />
    </div>
  );
}

function NewsletterForm() {
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-4 pt-8 border-t border-black/10">
      <div className="lg:col-span-2">
        <div className="label">Newsletter</div>
      </div>
      <div className="lg:col-span-10">
        <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.02em] mb-2">
          Bültene abone ol.
        </h3>
        <p className="text-sm text-black/60 mb-6">
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
          className="flex flex-col sm:flex-row gap-0 sm:gap-3 border-b-2 border-black"
        >
          <input
            name="email"
            type="email"
            required
            placeholder="ornek@mail.com"
            className="flex-1 bg-white border-0 px-0 py-3 font-display text-lg focus:outline-none placeholder:text-black/30"
          />
          <button
            type="submit"
            disabled={pending}
            className="font-mono text-xs uppercase tracking-widest px-6 py-3 bg-black text-white hover:bg-[#e63946] transition-colors disabled:opacity-40"
          >
            {pending ? "..." : "Abone Ol →"}
          </button>
        </form>
        {msg && (
          <p className="mt-3 text-xs font-mono text-black/60 uppercase tracking-widest">
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}
