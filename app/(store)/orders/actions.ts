"use server";

import { backendClient } from "@/sanity/lib/backendClient";
import { revalidatePath } from "next/cache";

export async function cancelOrder(orderId: string) {
  try {
    if (!orderId) throw new Error("Order ID is required");

    await backendClient
      .patch(orderId)
      .set({
        paymentStatus: "refunded",
        deliveryStatus: "canceled",
      })
      .commit();

    revalidatePath("/store/orders");

    return { success: true };
  } catch (err) {
    console.error("Cancel order error:", err);
    return { success: false, error: "Failed to cancel order" };
  }
}
