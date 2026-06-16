"use client";

import { useState, useTransition } from "react";
import { submitContact, subscribeNewsletter } from "@/lib/actions";
import toast from "react-hot-toast";

export default function ContactSection() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="cyber-heading text-4xl font-bold mb-8 text-center neon-text">İletişim</h2>
      <ContactForm />
      <NewsletterForm />
    </div>
  );
}

function ContactForm() {
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <div className="cyber-glass-light p-8 rounded-xl mb-12">
      <form
        action={(fd) =>
          start(async () => {
            const res = await submitContact(fd);
            if (res.ok) {
              setMsg("Mesajınız gönderildi! En kısa sürede dönüş yapılacak.");
              toast.success("Mesaj gönderildi");
            } else {
              const err = res.error ?? "Bir hata oluştu.";
              setMsg(err);
              toast.error(err);
            }
          })
        }
        className="space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-300">Adınız Soyadınız</label>
          <input
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={100}
            className="mt-1 block w-full p-3 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded-md focus:outline-none focus:ring-[#0ff] focus:border-[#0ff]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">E-posta</label>
          <input
            name="email"
            type="email"
            required
            maxLength={120}
            className="mt-1 block w-full p-3 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded-md focus:outline-none focus:ring-[#0ff] focus:border-[#0ff]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Konu</label>
          <input
            name="subject"
            type="text"
            maxLength={200}
            className="mt-1 block w-full p-3 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded-md focus:outline-none focus:ring-[#0ff] focus:border-[#0ff]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Mesajınız</label>
          <textarea
            name="message"
            rows={5}
            required
            minLength={10}
            maxLength={5000}
            className="mt-1 block w-full p-3 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded-md focus:outline-none focus:ring-[#0ff] focus:border-[#0ff]"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={pending}
            className="cyber-button text-white py-3 px-8 rounded-md font-semibold bg-[#0ff] hover:bg-[#ff2b9d] text-[#1a1a2e] disabled:opacity-50"
          >
            {pending ? "Gönderiliyor…" : "Gönder"}
          </button>
        </div>
        {msg && <p className="text-center text-sm text-[#0ff]">{msg}</p>}
      </form>
    </div>
  );
}

function NewsletterForm() {
  const [pending, start] = useTransition();
  return (
    <div className="cyber-glass p-8 rounded-xl text-center">
      <h3 className="cyber-heading text-2xl text-[#ff2b9d] mb-3">Bültene Abone Ol</h3>
      <p className="text-gray-300 mb-6">Yeni yazılardan haberdar olmak için abone olun.</p>
      <form
        action={(fd) =>
          start(async () => {
            const res = await subscribeNewsletter(fd);
            if (res.ok) toast.success(res.message ?? "Abone olundu");
            else toast.error(res.error ?? "Bir hata oluştu");
          })
        }
        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      >
        <input
          name="email"
          type="email"
          required
          placeholder="ornek@mail.com"
          className="flex-1 px-4 py-3 bg-[#1a1a2e] border cyber-border-field text-gray-300 rounded-md focus:outline-none focus:ring-[#0ff] focus:border-[#0ff]"
        />
        <button
          type="submit"
          disabled={pending}
          className="cyber-button px-6 py-3 rounded-md font-semibold bg-[#0ff] text-[#1a1a2e] hover:bg-[#ff2b9d] disabled:opacity-50"
        >
          {pending ? "..." : "Abone Ol"}
        </button>
      </form>
    </div>
  );
}
