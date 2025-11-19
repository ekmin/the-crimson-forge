import { getProductbyId } from "@/sanity/lib/products";
import { ArrowLeft, Check } from "lucide-react";
import PortableText from "react-portable-text";
import Link from "next/link";
import Image from "next/image";
import imageUrl from "@/lib/imageUrl";
import AddToCartButton from "@/components/AddToCartButton";
import { Product } from "@/sanity/lib/types";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const product = await getProductbyId(id);

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">ITEM NOT FOUND</h1>
          <Link
            href="/products"
            className="inline-block bg-crimson hover:bg-[#ff1a1a] text-white px-6 py-3 rounded-lg font-bold tracking-wider transition-all duration-200"
          >
            RETURN TO ARSENAL
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-30">
      <div className="container mx-auto px-6">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-crimson transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm tracking-wide">BACK TO ARSENAL</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-[#111111] border border-[#1a1a1a] rounded-lg p-12 flex items-center justify-center relative min-h-[300px]">
            {product.image && (
              <Image
                src={imageUrl(product.image).url()}
                alt="product image"
                fill
                className="object-contain"
              />
            )}
          </div>

          <div>
            <div className="flex gap-3 mb-2">
              {product.categories.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/products?category=${cat.slug.current}`}
                  className="text-sm text-crimson tracking-wider"
                >
                  {cat.title}
                </Link>
              ))}
            </div>
            <h1 className="text-xl md:text-5xl font-black mb-6 text-white">
              {product.name}
            </h1>
            <p className="text-4xl font-bold text-crimson mb-8">
              ${product.price}
            </p>

            {product.description && (
              <PortableText
                className="text-gray-300 mb-8 leading-relaxed"
                content={product.description}
                serializers={{
                  h1: (props: string[]) => (
                    <h1 className="text-crimson" {...props} />
                  ),
                  strong: (props: string[]) => (
                    <h1 className="font-bold" {...props} />
                  ),
                  normal: (props: string[]) => (
                    <p className="mb-3" {...props} />
                  ),
                  li: ({ children }: any) => (
                    <li className="text-gray-300 flex items-start gap-3">
                      <Check className="w-5 h-5 text-crimson" />
                      {children}
                    </li>
                  ),
                }}
              />
            )}
            <AddToCartButton product={product as Product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
