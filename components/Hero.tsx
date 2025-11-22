"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import StarField from "@/components/StarField";
import CreditIcon from "@/components/CreditIcon";

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -100]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <StarField />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/50 to-black"></div>
      <motion.div
        style={{ y }}
        className="container mx-auto px-6 text-center relative z-10"
      >
        <h1 className="text-6xl md:text-8xl font-black mb-6 text-white tracking-wider leading-tight">
          THE{" "}
          <span className="text-black text-shadow-lg text-shadow-crimson-glow">
            CRIMSON
          </span>{" "}
          FORGE
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 tracking-wide">
          STRENGTH IS EARNED, NOT GIVEN
        </p>
        <Link href="/products">
          <Button
            size="lg"
            className="button-primary text-base md:text-lg px-12 py-6 crimson-glow-hover"
          >
            ENTER THE FORGE
          </Button>
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;
