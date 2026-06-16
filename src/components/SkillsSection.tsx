"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
import { StaggerContainer, StaggerItem } from "./MotionWrapper";

const skills = [
  { name: "React / Next.js", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "Python", level: 88 },
  { name: "Node.js", level: 82 },
  { name: "TensorFlow / ML", level: 75 },
  { name: "PostgreSQL", level: 80 },
];

const stats = [
  { value: 50, label: "Tamamlanan Proje", suffix: "+" },
  { value: 5, label: "Yıllık Deneyim", suffix: "+" },
  { value: 1000, label: "Satır Kod", suffix: "K+" },
  { value: 15, label: "Mutlu Müşteri", suffix: "+" },
];

export default function SkillsSection() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* İstatistikler */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="cyber-glass p-6 rounded-xl text-center">
                <div className="cyber-heading text-4xl font-bold text-[#0ff] mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Yetenekler */}
        <h2 className="cyber-heading text-3xl font-bold text-center mb-12 neon-text">
          Teknik Yetenekler
        </h2>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill) => (
            <StaggerItem key={skill.name}>
              <div className="cyber-glass-light p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">{skill.name}</span>
                  <span className="text-[#0ff]">{skill.level}%</span>
                </div>
                <div className="h-2 bg-[#1a1a2e] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#0ff] to-[#ff2b9d] rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
