import { useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "@/components/FormInput";
import { getOrder } from "@/lib/api";
import { priceFormatter } from "@/lib/formater";
import Meta from "@/components/Meta";

const Orders = () => {
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
      case "cancel" || "expire" || "deny" || "challenge":
        return "bg-red-600";

      default:
        return "bg-blue-500";
    }
  };

  const statusMessage = (status) => {
    switch (status) {
      case "pending":
        return "Your order is waiting to be paid, please pay immediately using the payment method you choose";
      case "success":
        return "Your order has been paid for and will be processed soon. We have sent the detail to your email, please check your email";
      case "cancel":
        return "Your order has been cancelled";
      case "deny":
        return "Your order has been denied, please try to reorder";
      case "expire":
        return "Your order has expired because it has passed the payment deadline";
      case "challenge":
        return "Your order has challenge by FDS, please try to reorder";

      default:
        return "";
    }
  };

  const seo = {
    title: "Orders | Grandonk Merch",
    keywords: "merch, clothing, brand, orders",
  };

  return (
    <>
      <Meta seo={seo} />
      <div className="w-full h-44 bg-secondary flex items-end">
        <div className="container mx-auto px-6 lg:px-16">
          <h1 className="text-3xl md:text-5xl text-white font-semibold uppercase pl-6 py-1 border-l-4 border-primary">
            Check Order Transaction
          </h1>
        </div>
      </div>
      <span className="block w-full h-8 rounded-b-xl bg-secondary" />
      <div className="container mx-auto px-4 lg:px-16 pt-4 pb-10 flex flex-col lg:flex-row justify-between gap-4">
        <div className="w-full lg:w-5/12">
          <div className="w-full bg-white rounded-md overflow-hidden p-4 mb-4 shadow-lg">
            <h2 className="text-3xl font-semibold mb-3">Input Your Order ID</h2>
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
                  label="Email Address"
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
                      Processing
                    </>
                  ) : (
                    "NEXT"
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
                Error checking order
              </h2>
              <span className="block h-1 w-20 bg-primary mb-12"></span>
              <p className="text-xl">{errorMessage}</p>
            </div>
          </div>
        )}
        {order && (
          <div className="w-full lg:w-1/2">
            <div className="w-full bg-white rounded-md overflow-hidden p-4 mb-4 shadow-lg">
              <h2 className="text-3xl font-semibold mb-3">Order Status</h2>
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
                Order Details
              </h2>
              <span className="block h-1 w-20 bg-primary mb-8"></span>
              <div className="w-full text-sm">
                <div className="flex justify-between items-center w-full mb-2">
                  <span className="font-semibold">Order ID</span>
                  <span>{order.order_id}</span>
                </div>
                <div className="flex justify-between items-center w-full mb-2">
                  <span className="font-semibold">Payment Type</span>
                  <span className="uppercase">
                    {order.payment_type.replace(/_/g, " ")}
                  </span>
                </div>
                <div className="flex justify-between items-center w-full mb-2">
                  <span className="font-semibold">
                    Payment Code / VA Number
                  </span>
                  <span>{order.payment_code}</span>
                </div>

                <div className="w-full mb-2">
                  <span className="font-semibold">Items</span>
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
                  <span className="font-semibold">Total Amount</span>
                  <span>{priceFormatter.format(order.total_amount)}</span>
                </div>
              </div>

              <h2 className="text-3xl font-semibold mb-3 mt-12">
                Customer Details
              </h2>
              <span className="block h-1 w-20 bg-primary mb-8"></span>
              <div className="w-full text-sm">
                <div className="flex justify-between items-center w-full mb-2">
                  <span className="font-semibold">Name</span>
                  <span>{`${order.customer.first_name} ${order.customer.last_name}`}</span>
                </div>
                <div className="flex justify-between items-center w-full mb-2">
                  <span className="font-semibold">Email</span>
                  <span>{order.customer.email}</span>
                </div>
                <div className="flex justify-between items-center w-full mb-2">
                  <span className="font-semibold">Phone Number</span>
                  <span>{order.customer.phone}</span>
                </div>
                <div className="w-full mb-2">
                  <span className="font-semibold">Address</span>
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
