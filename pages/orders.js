import { useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "@/components/FormInput";
import { getOrder } from "@/lib/api";
import { localize, priceFormatter } from "@/lib/formater";
import Meta from "@/components/Meta";
import { useRouter } from "next/router";

const Orders = () => {
  const { locale } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [order, setOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setOrder(null);
    setErrorMessage("");
    setIsLoading(true);
    const order = await getOrder(data.order_id, data.email);
    console.log(order);
    if (order.error) {
      setErrorMessage(order.message);
    } else {
      setOrder(order);
    }
    setIsLoading(false);
  };

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

  const seo = {
    title: `${localize(locale, "orders")} | Grandonk Merch`,
    keywords: "merch, clothing, brand, orders",
  };

  return (
    <>
      <Meta seo={seo} />
      <div className="w-full h-44 bg-secondary flex items-end">
        <div className="container mx-auto px-6 lg:px-16">
          <h1 className="text-3xl md:text-5xl text-white font-semibold uppercase pl-6 py-1 border-l-4 border-primary">
            {localize(locale, "checkOrder")}
          </h1>
        </div>
      </div>
      <span className="block w-full h-8 rounded-b-xl bg-secondary" />
      <div className="container mx-auto px-4 lg:px-16 pt-4 pb-10 flex flex-col lg:flex-row justify-between gap-4">
        <div className="w-full lg:w-5/12">
          <div className="w-full bg-white rounded-md overflow-hidden p-4 mb-4 shadow-lg">
            <h2 className="text-3xl font-semibold mb-3">
              {localize(locale, "inputOrderId")}
            </h2>
            <span className="block h-1 w-20 bg-primary mb-12"></span>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-8 w-full md:w-5/6">
                <FormInput
                  id="order_id"
                  type="text"
                  label="Order ID"
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="mb-8 w-full md:w-5/6">
                <FormInput
                  id="email"
                  type="email"
                  label={localize(locale, "emailAddress")}
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="mb-2 w-full md:w-3/5">
                <button
                  type="sumbit"
                  className="flex justify-center items-center px-4 py-2 rounded-sm bg-primary hover:bg-opacity-90 text-white font-semibold text-center w-full  cursor-pointer disabled:bg-gray-400 disabled:pointer-events-none"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-t-2 border-white mr-4"></span>
                      {localize(locale, "processing")}
                    </>
                  ) : (
                    localize(locale, "next")
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {errorMessage && (
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col w-full bg-white rounded-md overflow-hidden p-4 mb-4 shadow-lg">
              <h2 className="text-3xl font-semibold mb-2">
                {localize(locale, "errorCheck")}
              </h2>
              <span className="block h-1 w-20 bg-primary mb-12"></span>
              <p className="text-xl">{errorMessage}</p>
            </div>
          </div>
        )}
        {order && (
          <div className="w-full lg:w-1/2">
            <div className="w-full bg-white rounded-md overflow-hidden p-4 mb-4 shadow-lg">
              <h2 className="text-3xl font-semibold mb-3">
                {localize(locale, "orderStatus")}
              </h2>
              <span className="block h-1 w-20 bg-primary mb-10"></span>
              <span
                className={`text-xl text-white font-medium uppercase px-6 py-2 rounded-sm ${statusBg(
                  order.transaction_status
                )}`}
              >
                {order.transaction_status}
              </span>
              <p className="text-lg font-light mt-6">
                {statusMessage(order.transaction_status)}
              </p>

              <h2 className="text-3xl font-semibold mb-3 mt-12">
                {localize(locale, "orderDetail")}
              </h2>
              <span className="block h-1 w-20 bg-primary mb-8"></span>
              <div className="w-full text-sm">
                <div className="flex justify-between items-center w-full mb-2">
                  <span className="font-semibold">Order ID</span>
                  <span>{order.order_id}</span>
                </div>
                <div className="flex justify-between items-center w-full mb-2">
                  <span className="font-semibold">
                    {localize(locale, "paymentType")}
                  </span>
                  <span className="uppercase">
                    {order.payment_type.replace(/_/g, " ")}
                  </span>
                </div>
                <div className="flex justify-between items-center w-full mb-2">
                  <span className="font-semibold">
                    {localize(locale, "paymentCode")}
                  </span>
                  <span>{order.payment_code}</span>
                </div>

                <div className="w-full mb-2">
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
                <div className="flex justify-between items-center w-full mb-2">
                  <span className="font-semibold">
                    {localize(locale, "totalAmount")}
                  </span>
                  <span>{priceFormatter.format(order.total_amount)}</span>
                </div>
              </div>

              <h2 className="text-3xl font-semibold mb-3 mt-12">
                {localize(locale, "customerDetail")}
              </h2>
              <span className="block h-1 w-20 bg-primary mb-8"></span>
              <div className="w-full text-sm">
                <div className="flex justify-between items-center w-full mb-2">
                  <span className="font-semibold">
                    {localize(locale, "name")}
                  </span>
                  <span>{`${order.customer.first_name} ${order.customer.last_name}`}</span>
                </div>
                <div className="flex justify-between items-center w-full mb-2">
                  <span className="font-semibold">
                    {localize(locale, "emailAddress")}
                  </span>
                  <span>{order.customer.email}</span>
                </div>
                <div className="flex justify-between items-center w-full mb-2">
                  <span className="font-semibold">
                    {localize(locale, "phone")}
                  </span>
                  <span>{order.customer.phone}</span>
                </div>
                <div className="w-full mb-2">
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
        )}
      </div>
    </>
  );
};

export default Orders;
