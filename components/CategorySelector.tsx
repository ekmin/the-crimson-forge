"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/sanity/lib/types";

const CategorySelector = ({
  categories,
  param,
}: {
  categories: Category[];
  param: string;
}) => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    if (!param) {
      setSelectedCategory("all");
    }
  }, [param]);

  useEffect(() => {
    if (param) {
      setSelectedCategory(param);
    }
  }, [param]);

  const handleSelectChange = (value: string) => {
    setSelectedCategory(value);

    if (value) {
      if (value === "all") {
        router.push("/products");
      } else {
        router.push(`/products?category=${value}`);
      }
    } else {
      router.push("/products");
    }
  };

  return (
    <Select value={selectedCategory} onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[180px] border-crimson border-2 bg-black text-gray-300">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          <SelectItem value="all">All</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category._id} value={category.slug}>
              {category.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategorySelector;
