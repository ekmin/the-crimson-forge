import { Product } from '@/sanity/lib/types'
import Link from 'next/link';
import imageUrl from "@/lib/imageUrl";
import Image from 'next/image';
import CreditIcon from './CreditIcon';

interface ProductCardProps {
  product: Product;
}


const ProductCard = ({ product }: ProductCardProps) => {
  return (
     <Link href={`/products/${product._id}`}>
      <div className="group bg-[#111111] border border-[#1a1a1a] rounded-lg overflow-hidden transition-all duration-200 hover:border-crimson crimson-glow-hover cursor-pointer">
        <div className="aspect-square bg-black flex items-center justify-center p-8 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110 relative">
            {product.image && (<Image
              src={imageUrl(product.image).url()}
              alt="product image"
              fill
              className="object-contain"
            />)}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-base font-bold mb-2 text-white tracking-wider group-hover:text-crimson transition-colors duration-200">
            {product.name}
          </h3>
          <p className="text-sm text-gray-400 mb-4">{product.categories.map(cat => cat.title).join(" | ")}</p>
          <p className="text-lg font-bold text-crimson flex items-start"><CreditIcon size={22} />{product.price.toLocaleString()}</p>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard