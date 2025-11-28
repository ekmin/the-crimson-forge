import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getOrdersByUserId } from "@/sanity/lib/orders";
import Image from "next/image";
import imageUrl from "@/lib/imageUrl";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CreditIcon from "@/components/CreditIcon";
import { Order } from "@/sanity/lib/types";
import CancelOrderButton from "@/components/CancelOrderButton";

const statusBadge = (status?: string) => {
  const s = (status || "").toLowerCase();
  if (s.includes("paid") || s.includes("delivered"))
    return "bg-emerald-600 text-white";
  if (s.includes("pending") || s.includes("processing"))
    return "bg-amber-500 text-black";
  if (s.includes("failed") || s.includes("canceled"))
    return "bg-red-600 text-white";
  return "bg-gray-700 text-white";
};

const Orders = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const orders: Order[] = await getOrdersByUserId(userId);

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <ShoppingBasket className="w-24 h-24 mx-auto mb-6 text-gray-600" />
          <h1 className="text-4xl font-bold mb-4 text-white">
            YOUR HAVEN'T FORGED ANY ORDERS
          </h1>
          <p className="text-gray-400 mb-8">The forge awaits your selection</p>
          <Link href="/products">
            <Button className="bg-crimson hover:bg-crimson-glow crimson-glow-hover font-bold tracking-wider text-white cursor-pointer">
              BROWSE ARSENAL
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-30">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black mb-4 text-white text-center">
            My Orders
          </h1>
          <p className="text-center text-gray-400 text-sm md:text-lg">
            The chronicles of your forged acquisitions
          </p>
        </div>

        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-[#0a0a0a] border border-[#1a1a1a] p-6 rounded-lg shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-base md:text-lg lg:text-xl uppercase font-bold text-white">
                    Order #{order._id}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Placed on {new Date(order.orderDate).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`px-3 py-1 rounded-full text-sm ${statusBadge(order.paymentStatus)}`}
                  >
                    {order.paymentStatus || "Unknown Payment"}
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm ${statusBadge(order.deliveryStatus)} ${order.paymentMethod === "cod" && order.deliveryStatus === "canceled" ? "hidden" : ""}`}
                  >
                    {order.deliveryStatus || "Unknown Delivery"}
                  </div>
                  <div className="text-sm text-gray-400">
                    <div className="flex items-start gap-1">
                      <CreditIcon size={18} />
                      <span className="uppercase">
                        {order.paymentMethod || "—"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-lg font-semibold text-white">Items</h3>
                  <ul className="space-y-3">
                    {order.items.map((item) => {
                      const product = item.product;
                      return (
                        <li
                          key={product._id}
                          className="flex items-center gap-4 bg-[#111111] border border-[#1a1a1a] p-3 rounded-md"
                        >
                          <div className="w-20 h-20 relative shrink-0 rounded overflow-hidden bg-black">
                            <Image
                              src={imageUrl(product.image).url()}
                              alt={product.name || "Product image"}
                              fill
                              sizes="80px"
                              className="object-contain"
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="text-white font-semibold text-sm md:text-base">
                                  {product.name || "Unnamed product"}
                                </p>
                                <p className="text-gray-400 text-sm mt-1">
                                  {product.categories
                                    .map((cat) => cat.title)
                                    .join(", ")}
                                </p>
                              </div>

                              <div className="text-right">
                                <p className="text-white font-medium">
                                  {product.price.toLocaleString() || 0}
                                </p>
                                <p className="text-gray-400 text-sm">
                                  x {item.quantity}
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <aside className="bg-[#111111] border border-[#1a1a1a] p-4 rounded-md h-fit">
                  <h4 className="text-white font-semibold">Summary</h4>
                  <div className="mt-3 space-y-2 text-gray-300 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{order.totalPrice.toLocaleString() ?? 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>FREE</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-700 pt-2 text-white font-bold">
                      <span>Total</span>
                      <span>{order.totalPrice.toLocaleString() ?? 0}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h5 className="text-sm text-gray-400">Payment</h5>
                    <p className="text-sm text-white mt-1">
                      Method: {order.paymentMethod || "—"}
                    </p>
                  </div>

                  <div className="mt-4">
                    <h5 className="text-sm text-gray-400">Delivery</h5>
                    <p className="text-sm text-white mt-1 capitalize">
                      {order.deliveryStatus || "—"}
                    </p>
                      <div className="mt-2 text-xs text-gray-300">
                        <div>{order.address}</div>
                      </div>
                  </div>

                  {order.deliveryStatus !== "delivered" && (
                    <CancelOrderButton
                      orderId={order._id}
                      disabled={order.deliveryStatus === "canceled"}
                      payMethod={order.paymentMethod}
                    />
                  )}
                </aside>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
