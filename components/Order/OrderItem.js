import { getMediaURL } from "@/lib/api";
import { localize, priceFormatter } from "@/lib/formater";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { MdClose, MdOutlineShoppingBag } from "react-icons/md";

export default function OrderItem({ order }) {
  const { locale, push } = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const statusBg = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "success":
        return "bg-green-500";
      case "cancel":
        return "bg-red-600";
      case "expire":
        return "bg-red-600";
      case "deny":
        return "bg-red-600";
      case "challenge":
        return "bg-red-600";

      default:
        return "bg-blue-500";
    }
  };

  const statusMessage = (status) => {
    switch (status) {
      case "pending":
        return localize(locale, "pendingMessage");
      case "success":
        return localize(locale, "successMessage");
      case "cancel":
        return localize(locale, "cancelMessage");
      case "deny":
        return localize(locale, "denyMessage");
      case "expire":
        return localize(locale, "expireMessage");
      case "challenge":
        return localize(locale, "challengeMessage");

      default:
        return "";
    }
  };
  return (
    <>
      <div className="w-full bg-white rounded-md overflow-hidden p-4 shadow-md space-y-4">
        <div className="flex items-center gap-3">
          <MdOutlineShoppingBag className="text-2xl" />
          <span className="text-sm text-gray-800">
            {new Date(order.created_at).toDateString()}
          </span>
          <span
            className={`text-xs text-white font-medium uppercase px-2 py-0.5 rounded-sm ${statusBg(
              order.transaction_status
            )}`}
          >
            {order.transaction_status}
          </span>
          <span className="text-xs text-gray-700">
            {`ORDER_ID ${order.order_id}`}
          </span>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-3 flex-grow">
            <Link href={`/products/${order.orderedProducts[0].product.slug}`}>
              <a className="block w-20 h-20 relative rounded overflow-hidden">
                <Image
                  src={getMediaURL(
                    order.orderedProducts[0].product.image[0].formats.medium
                  )}
                  alt={order.orderedProducts[0].product.name}
                  placeholder="blur"
                  blurDataURL={getMediaURL(
                    order.orderedProducts[0].product.image[0].formats.thumbnail
                  )}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  loading="lazy"
                />
              </a>
            </Link>
            <div className="space-y-2">
              <Link href={`/products/${order.orderedProducts[0].product.slug}`}>
                <a className="text-lg leading-none font-medium hover:text-secondary">
                  {order.orderedProducts[0].product.name}
                </a>
              </Link>
              <p className="text-xs text-gray-700">
                {`${
                  order.orderedProducts[0].quantity
                } x ${priceFormatter.format(
                  order.orderedProducts[0].product.price
                )}`}
              </p>
              {order.orderedProducts.length > 1 && (
                <p className="text-xs text-gray-700">
                  {`+ ${order.orderedProducts.length - 1} ${localize(
                    locale,
                    "products"
                  )}`}
                </p>
              )}
            </div>
          </div>
          <div className="w-1/3 px-3 py-1 border-l border-gray-200">
            <p className="text-sm text-gray-600">
              {localize(locale, "totalAmount")}
            </p>
            <p className="font-medium">
              {priceFormatter.format(order.total_amount)}
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <span
            onClick={() => {
              setIsOpen(true);
              document.querySelector("body").classList.add("overflow-hidden");
            }}
            className="text-sm text-primary font-medium hover:text-opacity-90 cursor-pointer"
          >
            {localize(locale, "seeOrderDetail")}
          </span>
        </div>
      </div>

      {isOpen && (
        <div
          onClick={() => {
            setIsOpen(false);
            document.querySelector("body").classList.remove("overflow-hidden");
          }}
          className="fixed top-0 bottom-0 right-0 left-0 w-full h-full bg-black/20 z-50 flex justify-center items-center py-10"
        >
          <div className="w-full max-w-2xl max-h-full bg-white rounded-md shadow-lg flex flex-col">
            <div className="p-4 flex justify-between items-center border-b border-gray-200">
              <h2 className="text-2xl font-medium text-gray-800">
                {localize(locale, "orderDetail")}
              </h2>
              <button
                onClick={() => {
                  setIsOpen(false);
                  document
                    .querySelector("body")
                    .classList.remove("overflow-hidden");
                }}
                className="text-xl"
              >
                <MdClose />
              </button>
            </div>
            <div className="p-4 flex-grow overflow-y-auto space-y-8">
              <div className="space-y-3">
                <span
                  className={`text-white font-medium uppercase px-4 py-1 rounded-sm ${statusBg(
                    order.transaction_status
                  )}`}
                >
                  {order.transaction_status}
                </span>
                <p className="text-sm font-light">
                  {statusMessage(order.transaction_status)}
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-full text-sm space-y-2">
                  <div className="flex justify-between items-center w-full">
                    <span className="font-semibold">Order ID</span>
                    <span>{order.order_id}</span>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <span className="font-semibold">
                      {localize(locale, "paymentType")}
                    </span>
                    <span className="uppercase">
                      {order.payment_type.replace(/_/g, " ")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <span className="font-semibold">
                      {localize(locale, "paymentCode")}
                    </span>
                    <span>{order.payment_code}</span>
                  </div>

                  <div className="w-full">
                    <span className="font-semibold">
                      {localize(locale, "items")}
                    </span>
                    <ul className="px-2">
                      {order.orderedProducts.map((item) => (
                        <li key={item.id}>
                          <span className="font-light mr-4">
                            {`${item.product.name}   ( ${item.size} )`}
                          </span>
                          <span className="font-medium">{`x  ${item.quantity}`}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <span className="font-semibold">
                      {localize(locale, "totalAmount")}
                    </span>
                    <span>{priceFormatter.format(order.total_amount)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="w-full text-sm space-y-2">
                  <div className="flex justify-between items-center w-full">
                    <span className="font-semibold">
                      {localize(locale, "name")}
                    </span>
                    <span>{`${order.customer.first_name} ${order.customer.last_name}`}</span>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <span className="font-semibold">
                      {localize(locale, "emailAddress")}
                    </span>
                    <span>{order.customer.email}</span>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <span className="font-semibold">
                      {localize(locale, "phone")}
                    </span>
                    <span>{order.customer.phone}</span>
                  </div>
                  <div className="w-full">
                    <span className="font-semibold">
                      {localize(locale, "address")}
                    </span>
                    <div className="w-full px-2">
                      <p>{order.customer.address}</p>
                      <p>{order.customer.city}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
