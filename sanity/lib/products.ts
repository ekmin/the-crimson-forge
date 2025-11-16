import { defineQuery } from "next-sanity";
import { client } from "./client";
import { Product } from "./types";

export const getAllProducts = async () => {
  const GET_ALL_PRODUCTS = defineQuery(`*[_type == "product"]{
  _id,
  name,
  "slug": slug.current,
  price,
  categories,
  image,
  description,
  stock,
  featured
}`);
  try {
    const categories = await client.fetch<Product[]>(
      GET_ALL_PRODUCTS,
      {}
    );
    return categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const getFeaturedProducts = async () => {
  const GET_FEATURED_PRODUCTS = defineQuery(`*[_type == "product" && featured == true]{
  _id,
  name,
  "slug": slug.current,
  price,
  categories,
  image,
  description,
  stock,
}`);
  try {
    const categories = await client.fetch<Product[]>(
      GET_FEATURED_PRODUCTS ,
      {}
    );
    return categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
