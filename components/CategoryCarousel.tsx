"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  animate,
} from "framer-motion";
import Link from "next/link";
import * as ic from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Category } from "@/sanity/lib/types";

interface CategoryCarouselProps {
  categories: Category[];
}

const CategoryCarousel = ({ categories }: CategoryCarouselProps) => {
  function makeInfiniteLike<T>(items: T[]) {
    let minLength = 20;
    let output = [...items];

    while (output.length < minLength) {
      output = [...output, ...items];
    }

    return output;
  }

  const infiniteList = makeInfiniteLike(categories);

  const x = useMotionValue(0);
  const speed = useRef(0.5);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useAnimationFrame(() => {
    if (hovering) return;

    const container = containerRef.current;
    if (!container) return;

    x.set(x.get() - speed.current);

    const totalWidth = container.scrollWidth / 3;

    if (Math.abs(x.get()) >= totalWidth) {
      x.set(0);
    }
  });

  const shift = (direction: "left" | "right") => {
    setHovering(true);

    const offset = direction === "left" ? 200 : -200;
    animate(x, x.get() + offset, {
      duration: 0.35,
      ease: "easeOut",
      onComplete: () => setHovering(false),
    });
  };

  return (
    <div className="relative w-full overflow-hidden py-10">
      <button
        onClick={() => shift("left")}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2
        bg-white/80 backdrop-blur crimson-glow-hover hover:border-crimson text-crimson p-2 rounded-lg shadow z-10 transition-all duration-200"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={() => shift("right")}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2
        bg-white/80 backdrop-blur p-2 crimson-glow-hover hover:border-crimson text-crimson rounded-lg shadow z-10 transition-all duration-200n"
      >
        <ChevronRight size={20} />
      </button>

      <motion.div
        ref={containerRef}
        style={{ x }}
        className="flex gap-4 active:cursor-grabbing"
        drag="x"
        dragConstraints={{ right: 0 }}
        dragElastic={0.05}
        onDragStart={() => setHovering(true)}
        onDragEnd={() => setHovering(false)}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {infiniteList.map((category, index) => {
          const Icon = category.icon ? (ic as any)[category.icon] : ic.Tag;
          return (
            <div
              className="shrink-0 w-full sm:w-1/2 lg:w-1/4 group bg-[#111111] border border-[#1a1a1a] rounded-lg p-8 text-center transition-all duration-200 hover:border-crimson crimson-glow-hover"
              key={index}
            >
              <Link href={`/products?category=${category.slug}`} className="">
                <Icon className="w-12 h-12 mx-auto mb-4 text-crimson" />
                <h3 className="text-lg font-bold text-white group-hover:text-crimson transition-colors duration-200">
                  {category.title}
                </h3>
              </Link>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default CategoryCarousel;
