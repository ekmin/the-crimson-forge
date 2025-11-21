"use client";

import { use, useState, useEffect } from "react";
import useCartStore from "../../store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";

const confettiCount = 18;

const circleVariants: Variants = {
  initial: { y: -40, opacity: 0, scale: 0.6 },
  animate: (i: number) => ({
    y: [ -40, -10, 40 + (i % 5) * 6 ],
    x: [0, (i % 3) * 8 - 8, (i % 7) * -10 + 10],
    rotate: [0, (i % 2 ? 90 : -90), (i % 5) * 160],
    opacity: [0, 1, 1, 0],
    scale: [0.6, 1.05, 1],
    transition: {
      duration: 1.8 + (i % 4) * 0.12,
      ease: "easeOut",
      repeat: 0,
    },
  }),
};

const checkVariants: Variants = {
  hidden: { scale: 0.6, opacity: 0, rotate: -10 },
  enter: { scale: 1, opacity: 1, rotate: 0, transition: { type: "spring", stiffness: 500, damping: 28 } },
};

const Success = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { clearCart } = useCartStore();
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    clearCart();
    const t = setTimeout(() => setShowConfetti(false), 2200);
    return () => clearTimeout(t);
  }, []);
  
  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-20">
      <div className="max-w-4xl w-full px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-8 md:p-12 shadow-lg relative overflow-hidden"
        >
          <AnimatePresence>
            {showConfetti &&
              new Array(confettiCount).fill(0).map((_, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={circleVariants}
                  initial="initial"
                  animate="animate"
                  className={`absolute w-2.5 h-2.5 rounded-full`}
                  style={{
                    left: `${(i * 7) % 100}%`,
                    top: `${10 + (i % 6) * 3}%`,
                    background:
                      i % 4 === 0
                        ? "rgb(220 38 38)"
                        : i % 4 === 1
                        ? "rgb(34 197 94)"
                        : i % 4 === 2
                        ? "rgb(59 130 246)"
                        : "rgb(250 204 21)",
                    zIndex: 5,
                  }}
                />
              ))}
          </AnimatePresence>

          <div className="flex flex-col md:flex-row items-center gap-6 md:justify-center">
            <motion.div
              initial="hidden"
              animate="enter"
              variants={checkVariants}
              className="shrink-0"
            >
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-linear-to-br from-crimson to-[#ff8a8a] flex items-center justify-center shadow-xl">
                <svg
                  className="w-12 h-12 md:w-14 md:h-14 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white">
                Order Forged Successfully
              </h1>
              <p className="mt-2 text-gray-400">
                Thank you, your order has been forged and queued for delivery.
              </p>

              <div className="mt-4 inline-flex items-center gap-3 bg-[#0b0b0b] border border-[#1a1a1a] px-4 py-2 rounded-full">
                <span className="text-sm text-gray-300">Order ID</span>
                <span className="text-xs md:text-sm font-mono text-white bg-[#080808] px-3 py-1 rounded">{id}</span>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
                <Button onClick={() => router.push("/orders")} className="button-primary crimson-glow-hover px-6">
                  View My Orders
                </Button>
                  <Button className="ml-0 sm:ml-2 button-secondary px-6" onClick={() => router.push("/products")} variant="outline">Continue Forging</Button>
              </div>
            </div>
            </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Success;
