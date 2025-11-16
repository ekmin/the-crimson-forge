"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/sanity/lib/types";
import Image from "next/image";
import imageUrl from "@/lib/imageUrl";

interface FeaturedCarouselProps {
  products: Product[];
}

const FeaturedCarousel = ({ products }: FeaturedCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoplay, products.length]);

  const next = () => {
    setCurrent((prev) => (prev + 1) % products.length);
    setAutoplay(false);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + products.length) % products.length);
    setAutoplay(false);
  };

  const product = products[current];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="bg-[#111111] border border-[#1a1a1a] rounded-lg p-12 flex items-center justify-center max-h-full md:max-h-[80%] aspect-square relative">
          {product.image && (
            <Image
              src={imageUrl(product.image).url()}
              alt="product image"
              fill
              className="object-contain"
            />
          )}
        </div>

        <div>
          <p className="text-sm text-crimson mb-2 tracking-wider">
            {product.categories.map((cat) => cat.title).join(", ")}
          </p>
          <h2 className="text-lg md:text-5xl font-black mb-4 text-white">
            {product.name}
          </h2>
          <p className="text-3xl font-bold text-crimson mb-6">
            ${product.price.toLocaleString()}
          </p>
          <p className="text-gray-300 mb-8 leading-relaxed">
            {/* {product.description} */}
          </p>

          <div className="flex gap-4">
            <Link
              href={`/products/${product._id}`}
              className="bg-crimson hover:bg-[#ff1a1a] text-white px-8 py-3 rounded-lg font-bold tracking-wider transition-all duration-200 crimson-glow-hover"
            >
              VIEW DETAILS
            </Link>
            <Link
              href={`/products/${product._id}`}
              className="border border-crimson text-crimson hover:bg-crimson hover:text-white px-8 py-3 rounded-lg font-bold tracking-wider transition-all duration-200"
            >
              ADD TO CART
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-12">
        <button
          onClick={prev}
          className="bg-[#111111] border border-[#1a1a1a] hover:border-crimson text-crimson p-3 rounded-lg transition-all duration-200 crimson-glow-hover"
          aria-label="Previous product"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex gap-2">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrent(index);
                setAutoplay(false);
              }}
              className={`transition-all duration-300 rounded-full ${
                index === current
                  ? "bg-crimson w-8 h-3 crimson-glow"
                  : "bg-[#1a1a1a] w-3 h-3 hover:bg-[#333333]"
              }`}
              aria-label={`Go to product ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="bg-[#111111] border border-[#1a1a1a] hover:border-crimson text-crimson p-3 rounded-lg transition-all duration-200 crimson-glow-hover"
          aria-label="Next product"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default FeaturedCarousel;
