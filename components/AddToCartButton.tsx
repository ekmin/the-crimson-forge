"use client";

import { useEffect, useState } from "react";
import { Product } from "@/sanity/lib/types";
import { Button } from "./ui/button";
import useCartStore from "@/app/(store)/store";

interface AddtoCartProps {
  product: Product;
}

const AddToCartButton = ({ product }: AddtoCartProps) => {
  const { addItem, removeItem, getItemCount } = useCartStore();
  const itemCount = getItemCount(product._id)

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex">
      <Button
        size="lg"
        className={
          "bg-crimson hover:bg-[#ff1a1a] text-white font-bold text-lg tracking-wider crimson-glow-hover transition-all duration-200 cursor-pointer"
        }
        onClick={() => removeItem(product._id)}
        disabled={itemCount === 0}
      >
        -
      </Button>
      <div className="flex text-center mx-5 px-10 items-center border border-crimson rounded-lg text-white font-bold text-lg">
        <p>{itemCount}</p>
      </div>
      <Button
        size="lg"
        className=" bg-crimson hover:bg-[#ff1a1a] text-white font-bold text-lg tracking-wider crimson-glow-hover transition-all duration-200 cursor-pointer"
        onClick={() => addItem(product)}
      >
        +
      </Button>
    </div>
  );
};

export default AddToCartButton;
