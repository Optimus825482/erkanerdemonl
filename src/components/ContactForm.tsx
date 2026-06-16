"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import GlowingButton from "./GlowingButton";
import { FadeIn } from "./MotionWrapper";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form validasyonu
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // İsim validasyonu
    if (!formData.name.trim()) {
      newErrors.name = "İsim alanı zorunludur";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "İsim en az 2 karakter olmalıdır";
    }

    // Email validasyonu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "E-posta alanı zorunludur";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi giriniz";
    }

    // Mesaj validasyonu
    if (!formData.message.trim()) {
      newErrors.message = "Mesaj alanı zorunludur";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Mesaj en az 10 karakter olmalıdır";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form gönderimi
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Lütfen tüm alanları doğru şekilde doldurun");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simüle edilmiş API çağrısı
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Başarılı gönderim
      toast.success("Mesajınız başarıyla gönderildi! 🎉");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Input değişikliği
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Hata mesajını temizle
    if (errors[id as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  return (
    <section id="iletisim" className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <FadeIn>
          <h2 className="cyber-heading text-4xl font-bold mb-4 text-center neon-text">
            İletişim
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Bir proje fikriniz mi var? Birlikte çalışmak ister misiniz?
            Aşağıdaki formu doldurarak benimle iletişime geçebilirsiniz.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="cyber-glass p-8 rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* İsim Alanı */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Adınız Soyadınız
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full p-4 bg-[#1a1a2e] border rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0ff] transition-all ${
                      errors.name ? "border-red-500" : "border-[#0ff]/20"
                    }`}
                    disabled={isSubmitting}
                    whileFocus={{ scale: 1.01 }}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* E-posta Alanı */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    E-posta Adresiniz
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-4 bg-[#1a1a2e] border rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0ff] transition-all ${
                      errors.email ? "border-red-500" : "border-[#0ff]/20"
                    }`}
                    disabled={isSubmitting}
                    whileFocus={{ scale: 1.01 }}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Mesaj Alanı */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Mesajınız
                </label>
                <motion.textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full p-4 bg-[#1a1a2e] border rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0ff] transition-all resize-none ${
                    errors.message ? "border-red-500" : "border-[#0ff]/20"
                  }`}
                  disabled={isSubmitting}
                  whileFocus={{ scale: 1.01 }}
                  placeholder="Projeniz hakkında bilgi verin..."
                />
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-500"
                  >
                    {errors.message}
                  </motion.p>
                )}
              </div>

              {/* Gönder Butonu */}
              <div className="flex justify-center pt-4">
                <GlowingButton
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Gönderiliyor...
                    </span>
                  ) : (
                    "Mesaj Gönder"
                  )}
                </GlowingButton>
              </div>
            </form>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
