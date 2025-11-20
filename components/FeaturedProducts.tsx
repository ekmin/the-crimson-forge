import Link from "next/link"
import { Button } from "@/components/ui/button";
import FeaturedCarousel from "./FeaturedCarousel"
import { getFeaturedProducts } from "@/sanity/lib/products"


const FeaturedProducts = async () => {
  const featuredProducts = await getFeaturedProducts();

  return (
      <section className="py-20 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            FEATURED ARSENAL
          </h2>
          <FeaturedCarousel products={featuredProducts} />
          <div className="text-center mt-12">
            <Link href="/products">
              <Button
                className="border-2 border-crimson bg-transparent text-crimson hover:bg-crimson hover:text-white font-bold tracking-wider transition-all duration-200 cursor-pointer"
              >
                VIEW ALL PRODUCTS
              </Button>
            </Link>
          </div>
        </div>
      </section>
  )
}

export default FeaturedProducts