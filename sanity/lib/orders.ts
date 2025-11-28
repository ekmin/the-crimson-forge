import { defineQuery } from "next-sanity";
import { client } from "./client";
import { Order } from "./types";

export const getOrdersByUserId = async (userId: string) => {
  const GET_ORDERS_BY_USERID =
    defineQuery(`*[_type == "order" && clerkUserId == $userId] | order(orderDate desc){
  _id,
  clerkUserId,
  orderDate,
  address,
  paymentMethod,
  paymentStatus,
  deliveryStatus,
  totalPrice,
  items[] {
    quantity,
    product->{
      _id,
      name,
      price,
      image{asset->{url}},
      "slug": slug.current,
      categories[]->{
        _id,
        title,
        "slug": slug.current,
        icon
      }
    }
  }
}`);
  try {
    const orders = await client.fetch<Order[]>(GET_ORDERS_BY_USERID, {
      userId,
    }, { cache: "no-store" });
    return orders || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
