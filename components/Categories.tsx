import { type SanityDocument } from "next-sanity";
import { client } from "../sanity/lib/client";
import Link from "next/link";
import { GET_CATEGORIES } from "@/lib/queries";
import * as ic from "lucide-react";

const Categories = async () => {
  const categories = await client.fetch<SanityDocument[]>(GET_CATEGORIES, {});

  return (
        <section className="bg-[#0a0a0a] py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">FORGE YOUR PATH</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {categories.map((category, index) => {
              const Icon = category.icon ? (ic as any)[category.icon] : ic.Tag;
              return (
                <Link
                  key={index}
                  href="/products"
                  className="group bg-[#111111] border border-[#1a1a1a] rounded-lg p-8 text-center transition-all duration-200 hover:border-crimson crimson-glow-hover"
                >
                  <Icon className="w-12 h-12 mx-auto mb-4 text-crimson" />
                  <h3 className="text-lg font-bold text-white group-hover:text-crimson transition-colors duration-200">
                    {category.title}
                  </h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
  )
}

export default Categories