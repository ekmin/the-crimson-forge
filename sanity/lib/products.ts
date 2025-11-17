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
    const products = await client.fetch<Product[]>(
      GET_ALL_PRODUCTS,
      {}
    );
    return products || [];
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

export const getProductbyId = async (id: string) => {
  const GET_PRODUCT_BY_ID = defineQuery(`*[_type == "product" && _id == "${id}"][0]{
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
    const products = await client.fetch<Product>(
      GET_PRODUCT_BY_ID,
      {}
    );
    return products || { _id: "", _type: "product", name: "", slug: { current: "" }, price: 0, categories: [], description: "", image: undefined, stock: 0, featured: false };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { _id: "", _type: "product", name: "", slug: { current: "" }, price: 0, categories: [], description: "", image: undefined, stock: 0, featured: false};
  }
};

export const getProductsbyCategory = async (categorySlug: string) => {
  const GET_PRODUCTS_BY_CAT = defineQuery(`*[_type == "product" && "${categorySlug}" in categories[]->slug.current]{
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
    const products = await client.fetch<Product[]>(
      GET_PRODUCTS_BY_CAT,
      {}
    );
    return products || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};