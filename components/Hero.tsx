"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import StarField from "@/components/StarField";

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
        <motion.h1
          initial={{ y: 40, opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-black mb-6 text-white tracking-wider leading-tight"
        >
          THE{" "}
          <span className="text-black text-shadow-lg text-shadow-crimson-glow">
            CRIMSON
          </span>{" "}
          FORGE
        </motion.h1>
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
