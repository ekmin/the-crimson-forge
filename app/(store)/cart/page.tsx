"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import useCartStore from "../store";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import imageUrl from "@/lib/imageUrl";
import CartButtons from "@/components/CartButtons";

const Cart = () => {
  const groupedItems = useCartStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center h-screen justify-center">
        <h1 className="text-crimson text-4xl">Forging...</h1>
      </div>
    );
  }

  if (groupedItems.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-gray-600" />
          <h1 className="text-4xl font-bold mb-4 text-white">
            YOUR CART IS EMPTY
          </h1>
          <p className="text-gray-400 mb-8">The forge awaits your selection</p>
          <Link href="/products">
            <Button className="bg-crimson hover:bg-crimson-glow crimson-glow-hover font-bold tracking-wider text-white cursor-pointer">
              BROWSE ARSENAL
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-30">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-black mb-12 text-white text-center">
          YOUR CART
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {groupedItems.map((item, i) => (
              <div
                key={i}
                className="bg-[#111111] border border-[#1a1a1a] rounded-lg p-6 flex gap-6"
              >
                <div className="w-24 h-24 bg-black rounded-lg flex items-center justify-center shrink-0 relative">
                  {item.product.image && (
                    <Image
                      src={imageUrl(item.product.image).url()}
                      alt="product image"
                      fill
                      className="object-contain"
                    />
                  )}
                </div>

                <div className="flex-1">
                  <h3
                    className="text-xl font-bold text-white mb-2 cursor-pointer"
                    onClick={() => router.push(`/products/${item.product._id}`)}
                  >
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    {item.product.categories
                      .map((category) => category.title)
                      .join(" | ")}
                  </p>
                  <p className="text-xl font-bold text-crimson">
                    ${item.product.price * item.quantity}
                  </p>
                </div>
                
                <CartButtons product={item.product} />
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[#111111] border border-[#1a1a1a] rounded-lg p-8 sticky top-24">
              <h2 className="text-2xl font-bold mb-6 text-white">
                ORDER SUMMARY
              </h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-[#1a1a1a]">
                <div className="flex justify-between text-gray-300">
                  <span>Items</span>
                  <span>
                    {groupedItems.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>$ {useCartStore.getState().getTotalPrice()}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span className="text-crimson">FREE</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold mb-8">
                <span className="text-white">Total</span>
                <span className="text-crimson">
                  ${useCartStore.getState().getTotalPrice()}
                </span>
              </div>

              {isSignedIn ? (
                <Link href="/checkout">
                <Button
                  size="lg"
                  className="w-full bg-crimson hover:bg-crimson-glow text-white font-bold text-lg tracking-wider crimson-glow-hover transition-all duration-200 mb-4 cursor-pointer"
                >
                  PROCEED TO CHECKOUT
                </Button>
                </Link>
              ) : (
                <SignInButton mode="modal">
                  <Button
                    size="lg"
                    className="w-full bg-crimson hover:bg-crimson-glow text-white font-bold text-lg tracking-wider crimson-glow-hover transition-all duration-200 mb-4 cursor-pointer"
                  >
                    SIGN IN TO CHECKOUT
                  </Button>
                </SignInButton>
              )}

              <Link href="/products">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-crimson text-crimson hover:bg-crimson hover:text-white font-bold tracking-wider transition-all duration-200 cursor-pointer"
                >
                  CONTINUE SHOPPING
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
