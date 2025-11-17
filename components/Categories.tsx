import { getAllCategories } from "@/sanity/lib/categories";
import CategoryCarousel from "./CategoryCarousel";

const Categories = async () => {
  const categories = await getAllCategories();

  return (
    <section className="bg-[#0a0a0a] py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          FORGE YOUR PATH
        </h2>
        <CategoryCarousel categories={categories} />
      </div>
    </section>
  );
};

export default Categories;
