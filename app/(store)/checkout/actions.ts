"use server";

import { backendClient } from "@/sanity/lib/backendClient";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { CartItem } from "../store";

interface userType {
  id: string;
  name: string;
  email: string;
}

export async function createOrder(data: {
  user: userType;
  items: CartItem[];
  totalPrice: number;
  address: string;
  paymentMethod: string;
}) {
    const order = await backendClient.create({
      _type: "order",
      clerkUserId: data.user.id,
      customerName: data.user.name,
      customerEmail: data.user.email,
      address: data.address,
      items: data.items.map((i) => ({
        _type: "orderItem",
        _key: crypto.randomUUID(),
        product: {
          _type: "reference",
          _ref: i.product._id,
        },
        quantity: i.quantity,
      })),
      totalPrice: data.totalPrice,
      paymentMethod: data.paymentMethod,
      paymentStatus: data.paymentMethod === "card" ? "paid" : "pending",
      deliveryStatus: "processing",
      orderDate: new Date().toISOString(),
    });

    revalidatePath("/store/orders");
    redirect(`/success/${order._id}`);
}
