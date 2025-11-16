import { defineQuery } from "next-sanity";
import { client } from "./client";
import { Category } from "./types";

export const getAllCategories = async () => {
  const GET_ALL_CATEGORIES = defineQuery(`*[_type == "category"]{
  _id,
  title,
  "slug": slug.current,
  icon,
  description,
}`);
  try {
    const categories = await client.fetch<Category[]>(
      GET_ALL_CATEGORIES,
      {}
    );
    return categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
