import FormInput from "@/components/FormInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import Meta from "@/components/Meta";
import OrderItem from "@/components/Order/OrderItem";
import { getOrders } from "@/lib/api";
import { localize, priceFormatter } from "@/lib/formater";
import { useRouter } from "next/router";
import useSWR from "swr";

const Orders = () => {
  const { locale } = useRouter();
  const seo = {
    title: `${localize(locale, "orders")} | Grandonk Merch`,
    keywords: "merch, clothing, brand, orders",
  };

  const { data: orders } = useSWR("order-history", () => {
    const orderData = JSON.parse(window.localStorage.getItem("order_history"));
    if (!orderData || !orderData.order_list || !orderData.order_list.length) {
      return [];
    }
    const parameters = orderData.order_list.map(
      (order_id, index) => `_where[order_id][${index}]=${order_id}`
    );
    return getOrders(`?${parameters.join("&")}`);
  });

  return (
    <>
      <Meta seo={seo} />
      <div className="w-full h-44 bg-secondary flex items-end">
        <div className="container mx-auto px-6 lg:px-16">
          <h1 className="text-3xl md:text-5xl text-white font-semibold uppercase pl-6 py-1 border-l-4 border-primary">
            {localize(locale, "yourOrderHistory")}
          </h1>
        </div>
      </div>
      <span className="block w-full h-8 rounded-b-xl bg-secondary" />

      {orders ? (
        orders.length > 0 ? (
          <div className="container mx-auto px-4 lg:px-16 pt-4 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {orders.map((order) => (
              <OrderItem order={order} />
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <h2 className="text-3xl">
              {localize(locale, "orderHistoryEmpty")}
            </h2>
          </div>
        )
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default Orders;
