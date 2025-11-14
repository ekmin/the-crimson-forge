"use client";

import { Flame, Shield, Zap, Globe } from "lucide-react";
import { motion } from "framer-motion";

const Features = () => {
  return (
    <section className="py-20 bg-black">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
        className="container mx-auto px-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <Flame className="w-10 h-10 mx-auto mb-4 text-crimson" />
            <h3 className="text-sm font-bold mb-2 text-white tracking-wider">
              FORGED TO ENDURE
            </h3>
            <p className="text-sm text-gray-400">
              Built for power and longevity
            </p>
          </div>
          <div className="text-center">
            <Globe className="w-10 h-10 mx-auto mb-4 text-crimson" />
            <h3 className="text-sm font-bold mb-2 text-white tracking-wider">
              GALACTIC SHIPPING
            </h3>
            <p className="text-sm text-gray-400">Delivered across systems</p>
          </div>
          <div className="text-center">
            <Shield className="w-10 h-10 mx-auto mb-4 text-crimson" />
            <h3 className="text-sm font-bold mb-2 text-white tracking-wider">
              QUALITY GUARANTEED
            </h3>
            <p className="text-sm text-gray-400">Tested and validated</p>
          </div>
          <div className="text-center">
            <Zap className="w-10 h-10 mx-auto mb-4 text-crimson" />
            <h3 className="text-sm font-bold mb-2 text-white tracking-wider">
              SECURE PURCHASE
            </h3>
            <p className="text-sm text-gray-400">Encrypted and protected</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Features;
