import { getAllProducts, getProductsbyCategory } from "@/sanity/lib/products";
import { getAllCategories } from "@/sanity/lib/categories";
import ProductCard from "@/components/ProductCard";
import CategorySelector from "@/components/CategorySelector";

const Products = async ({
  searchParams,
}: {
  searchParams: { category: string };
}) => {
  const { category } = await searchParams;
  const allProducts = await getAllProducts();
  const categoryProducts = await getProductsbyCategory(category);
  const allCategories = await getAllCategories();

  return (
    <div className="min-h-screen bg-black py-30">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-5xl font-black mb-4 text-white text-center">
            THE ARSENAL
          </h1>
          <p className="text-center text-gray-400 text-lg">
            Every weapon forged, every armor crafted for those who command power
          </p>
        </div>

        <div className="flex justify-end text-center mb-4">
          <CategorySelector categories={allCategories} param={category} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {category == null ? (
            allProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            categoryProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
