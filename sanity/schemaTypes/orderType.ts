import { defineField, defineType } from "sanity";
import { ShoppingBasket } from "lucide-react";

export const orderType = defineType({
  name: "order",
  title: "Orders",
  type: "document",
  icon: ShoppingBasket,
  fields: [
    defineField({
      name: "clerkUserId",
      title: "Store User ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "customerEmail",
      title: "Customer Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "orderItem" }],
    }),
    defineField({
      name: "totalPrice",
      title: "Total Price",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "paymentMethod",
      title: "Payment Method",
      type: "string",
      options: {
        list: [
          { title: "Card", value: "card" },
          { title: "COD", value: "cod" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "paymentStatus",
      title: "Payment Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Paid", value: "paid" },
          { title: "Failed", value: "failed" },
          { title: "Refunded", value: "refunded" },
          { title: "Canceled", value: "canceled" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "deliveryStatus",
      title: "Delivery Status",
      type: "string",
      options: {
        list: [
          { title: "Processing", value: "processing" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Canceled", value: "canceled" },
        ],
        layout: "dropdown",
      },
      initialValue: "processing",
    }),
    defineField({
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      name: "customerName",
      amount: "totalPrice",
      orderId: "_id",
      email: "customerEmail",
    },
    prepare(select) {
      const orderIdSnippet = `${select.orderId.slice(0, 5)}...${select.orderId.slice(-5)}`;
      return {
        title: `${select.name} (${orderIdSnippet})`,
        subtitle: `${select.amount} ${select.email}`,
        media: ShoppingBasket,
      };
    },
  },
});
