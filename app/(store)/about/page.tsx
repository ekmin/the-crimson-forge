"use client";

import Starfiled from "@/components/StarField";
import { Flame, Shield, Target, Zap } from "lucide-react";
import { motion } from "framer-motion";

const principles = [
  {
    title: "FORGED TO ENDURE",
    icon: Flame,
    description:
      "We build for eternity. Each piece undergoes trials that exceed any battlefield condition, ensuring unbreakable reliability when you need it most.",
  },
  {
    title: "TESTED IN FIRE",
    icon: Shield,
    description:
      "No item leaves our foundry untested. We subject every creation to extreme stress, verifying its worthiness before the Crimson seal is applied.",
  },
  {
    title: "PRECISION CRAFTED",
    icon: Target,
    description:
      "Our master smiths combine ancient techniques with cutting-edge technology, achieving a level of precision measured in molecules, not millimeters.",
  },
  {
    title: "POWER AMPLIFIED",
    icon: Zap,
    description:
      "We don't just create tools. We forge force multipliers that transform the capable into the unstoppable, the determined into the inevitable.",
  },
];

const codes = [
  "Strength through discipline",
  "Power through precision",
  "Victory through superior firepower",
  "Excellence without compromise",
  "The forge tempers all",
];

const About = () => {
  return (
    <div className="min-h-screen">
      <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <Starfiled />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/50 to-black"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto px-6 text-center relative z-10"
        >
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black mb-4 text-white">
            ABOUT THE FORGE
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-300 tracking-wide">
            WHERE POWER IS BORN
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <section className="mb-16">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 text-crimson">
              THE CRIMSON LEGACY
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed text-sm md:text-base">
              <p>
                In the depths of the galaxy's most volatile systems, where stars
                collapse and matter is reborn, The Crimson Forge was
                established. Not as a mere workshop, but as a crucible where raw
                power is shaped into tangible form.
              </p>
              <p>
                For generations, we have served those who refuse to accept
                weakness. Our artisans work in conditions that would destroy
                lesser beings, tempering each piece in plasma fires and testing
                them in combat simulations that mirror the brutality of true
                warfare.
              </p>
              <p>
                Every weapon bears the mark of perfection. Every armor plate has
                been struck a thousand times and emerged stronger. Every
                artifact carries within it the essence of dominance.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-8 text-crimson">
              OUR PRINCIPLES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {principles.map((principle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="bg-[#111111] border border-[#1a1a1a] rounded-lg p-8"
                >
                  <principle.icon className="w-12 h-12 text-crimson mb-4" />
                  <h3 className="text-base md:text-lg lg:text-xl font-bold mb-3 text-white">
                    {principle.title}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base">
                    {principle.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 text-crimson">
              THE PROMISE
            </h2>
            <div className="bg-[#111111] border border-crimson rounded-lg p-8 text-sm md:text-base glow-box">
              <p className="text-gray-300 leading-relaxed mb-4">
                When you wield a weapon from The Crimson Forge, you carry more
                than metal and energy, you carry the weight of a legacy.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We do not arm the weak. We forge for those who have proven
                their resolve and seek the tools to manifest their will upon the
                galaxy.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 text-crimson">
              THE CODE
            </h2>
            <div className="space-y-3">
              {codes.map((line, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  key={index}
                  className="flex items-center gap-4 text-gray-300"
                >
                  <div className="w-2 h-2 bg-crimson"></div>
                  <p className="text-base md:text-lg tracking-wide">{line}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 text-gray-500">
              Note
            </h2>
            <p className="text-sm md:text-base text-gray-500 italic">
              This website was created for the Pulz'25 web development
              competition. All products and elements are purely fictional and
              inspired by the Star Wars universe for demonstration purposes
              only.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
