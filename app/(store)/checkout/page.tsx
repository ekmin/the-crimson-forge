"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import useCartStore, { CartItem } from "../store";
import { Button } from "@/components/ui/button";
import { createOrder } from "../checkout/actions";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import imageUrl from "@/lib/imageUrl";
import CreditIcon from "@/components/CreditIcon";

const Checkout = () => {
  const groupedItems = useCartStore((state) => state.getGroupedItems());
  const { user } = useUser();
  const router = useRouter();

  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("cod");
  const [isClient, setIsClient] = useState(false);

  const total = useCartStore((state) => state.getTotalPrice());

  const items: CartItem[] = groupedItems;

  useEffect(() => {
    setIsClient(true);

    if (!user || groupedItems.length === 0) {
      router.push("/");
    }
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center h-screen justify-center">
        <h1 className="text-crimson text-4xl">Forging...</h1>
      </div>
    );
  }

  const handleCheckout = async () => {
    try {
      await createOrder({
        user: {
          id: user?.id || "",
          name: `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
          email: user?.emailAddresses[0]?.emailAddress || "",
        },
        items,
        totalPrice: total,
        address,
        paymentMethod: payment,
      });
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black py-30">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black mb-4 text-white text-center">
            CHECKOUT
          </h1>
          <p className="text-center text-gray-400 text-base md:text-lg">
            Only few steps left to complete your purchase.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-[#0a0a0a] border border-[#1a1a1a] p-6 rounded-lg shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-white mb-3">
                Customer
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label className="mb-3">First name</Label>
                  <Input value={user?.firstName || ""} />
                </div>
                <div>
                  <Label className="mb-3">Last name</Label>
                  <Input value={user?.lastName || ""} />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Address</h2>
              <Label className="mb-3">Shipping address</Label>
              <Textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your shipping address"
                rows={4}
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Payment</h2>
              <Label className="mb-3">Method</Label>
              <Select value={payment} onValueChange={(v) => setPayment(v)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cod">Cash on Delivery</SelectItem>
                  <SelectItem value="card">Card (dummy)</SelectItem>
                </SelectContent>
              </Select>

              {payment === "card" && (
                <div className="mt-4 space-y-2">
                  <Label className="mb-3">Card details (demo)</Label>
                  <Input value="4242 4242 4242 4242" disabled />
                  <div className="grid grid-cols-2 gap-2">
                    <Input value="12/34" disabled />
                    <Input value="123" disabled />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    This is a dummy card for demo purposes only.
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3">
              <Button
                onClick={handleCheckout}
                disabled={items.length === 0 || !address}
                className="w-full button-primary crimson-glow-hover"
                size="lg"
              >
                Place Order :- {total || 0}
              </Button>
            </div>
          </div>

          <aside className="bg-[#0a0a0a] border border-[#1a1a1a] p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-white mb-4">
              Your Items
            </h3>

            <ul className="space-y-4">
              {items.map((item, idx) => {
                const product = item.product || ({} as any);
                return (
                  <li
                    key={idx}
                    className="flex items-center gap-3 bg-[#111111] border border-[#1a1a1a] p-3 rounded"
                  >
                    <div className="w-16 h-16 relative shrink-0 rounded overflow-hidden bg-black">
                      <Image
                        src={imageUrl(product.image).url()}
                        alt={product.name || "Product image"}
                        fill
                        sizes="80px"
                        className="object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">
                        {product.name || "Unnamed product"}
                      </p>
                      <p className="text-gray-400 text-sm truncate">
                        {product.categories
                          ?.map((cat: any) => cat.title)
                          .join(" | ") || ""}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-white font-semibold">
                        {product.price || 0}
                      </p>
                      <p className="text-gray-400 text-sm">x{item.quantity}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 border-t border-[#1a1a1a] pt-4">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>{total || 0}</span>
              </div>
              <div className="flex justify-between text-gray-300 mt-1">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between text-white font-bold mt-3 text-lg">
                <span>Total</span>
                <span className="flex"><CreditIcon size={22} /> {total || 0}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
