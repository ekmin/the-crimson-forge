export interface Category {
  _id: string;
  title: string;
  slug: string;
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

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  _id: string;
  _type: "order";
  clerkUserId: string;
  customerName: string;
  customerEmail: string;
  address: string;
  items: OrderItem[];
  totalPrice: number;
  paymentMethod: "card" | "cod";
  paymentStatus: "paid" | "pending" | "failed" | "refunded";
  deliveryStatus: "processing" | "shipped" | "delivered" | "canceled";
  orderDate: Date;
}