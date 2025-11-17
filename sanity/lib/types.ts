export interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  icon: string;
  description?: string;
}

export interface Product {
  _id: string;
  _type: "product";
  name: string;
  slug: { _type: "slug"; current: string };
  price: number;
  categories: Category[];
  image?: {
    _type: "image";
    asset: { _ref: string; _type: "reference" };
    hotspot?: boolean;
  };
  description?: any;
  stock?: number;
  featured?: boolean;
}