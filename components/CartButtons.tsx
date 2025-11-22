"use client";

import { useEffect, useState } from "react";
import { Product } from "@/sanity/lib/types";
import { Button } from "./ui/button";
import useCartStore from "@/app/(store)/store";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

const CartButtons = ({ product }: { product: Product }) => {
  const { addItem, removeItem, removeAllItems, getItemCount } = useCartStore();
  const itemCount = getItemCount(product._id);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex flex-col items-end justify-between">
      <button
        onClick={() => removeAllItems(product._id)}
        className="text-gray-400 hover:text-crimson transition-colors duration-200 cursor-pointer"
      >
        <Trash2 className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-3 bg-black border border-[#1a1a1a] rounded-lg">
        <button
          onClick={() => removeItem(product._id)}
          className="py-2 px-1 md:p-2 hover:text-crimson transition-colors duration-200 cursor-pointer"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="text-white font-bold w-4 md:w-8 text-center">{itemCount}</span>
        <button
          className="py-2 px-1 md:p-2 hover:text-crimson transition-colors duration-200 cursor-pointer"
          onClick={() => addItem(product)}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartButtons;
