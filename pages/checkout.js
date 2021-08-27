import { useForm, FormProvider } from "react-hook-form";
import Script from "next/script";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";

import CustomerForm from "@/components/Checkout/CustomerForm";
import { useCart } from "@/contexts/CartContext";
import { getToken, createOrder, getCity, getProvince } from "@/lib/api";
import Meta from "@/components/Meta";

const Checkout = (props) => {
  const methods = useForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { items, emptyCart } = useCart();

  const { data: allProvince } = useSWR("province", () => getProvince(), {
    initialData: props.province,
  });
  const { data: allCities } = useSWR("cities", () => getCity(), {
    initialData: props.cities,
  });

  const getCityName = async (cityId) => {
    const city = await getCity(`?id=${cityId}`);
    return `${city.type} ${city.city_name}, ${city.province}`;
  };

  function getTransactionDetail(result) {
    if (result.payment_type == "bank_transfer") {
      return {
        payment_type: result.payment_type,
        payment_code: result.va_numbers[0].va_number,
      };
    }
    if (result.payment_type == "cstore") {
      return {
        payment_type: `${result.payment_type} (${result.store})`,
        payment_code: result.payment_code,
      };
    }
    return {
      payment_type: result.payment_type,
      payment_code: "No Payment Code",
    };
  }

  const getOrderedProducts = (items) => {
    const products = items.map((item) => {
      return {
        product: item.id,
        quantity: item.quantity,
        size: item.size,
      };
    });

    return products;
  };

  const getCustomerDetail = async (data) => {
    return {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      city: await getCityName(data.city),
      address: data.address,
    };
  };

  async function handleResponse(result, data) {
    setIsLoading(true);
    const transactionDetail = getTransactionDetail(result);
    const body = {
      orderedProducts: getOrderedProducts(items),
      customer: await getCustomerDetail(data),
      ...transactionDetail,
      shipping_price: parseInt(data.shipping_price),
      total_amount: result.gross_amount,
      transaction_status: result.transaction_status,
      transaction_id: result.transaction_id,
      order_id: result.order_id,
    };

    const order = await createOrder(body);
    if (order.error) {
      console.log(order.error);
    }

    emptyCart();
    router.push("/orders");
    setIsLoading(false);
  }

  const onSubmit = async (data) => {
    setIsLoading(true);
    const products = items.map((item) => {
      return { id: item.id, quantity: item.quantity, size: item.size };
    });
    const customer = { ...data };

    const token = await getToken({ products, customer });
    setIsLoading(false);

    snap.pay(token.transaction_token, {
      onSuccess: function (result) {
        console.log(result);
        handleResponse(result, data);
      },
      onPending: function (result) {
        console.log(result);
        handleResponse(result, data);
      },
      onError: function (result) {
        console.log(result);
        handleResponse(result, data);
      },
    });
  };

  const seo = {
    title: "Checkout | Grandonk Merch",
    keywords: "merch, clothing, brand, checkout",
  };

  return (
    <>
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
      />
      <Meta seo={seo} />
      <div className="w-full h-44 bg-secondary flex items-end">
        <div className="container mx-auto px-6 lg:px-16">
          <h1 className="text-3xl md:text-5xl text-white font-semibold uppercase pl-6 py-1 border-l-4 border-primary">
            Checkout
          </h1>
        </div>
      </div>
      <span className="block w-full h-8 rounded-b-xl bg-secondary" />
      <div className="container mx-auto px-4 lg:px-40 pt-4 pb-10">
        <div className="bg-white rounded-md overflow-hidden p-4 mb-4 shadow-lg">
          <FormProvider {...methods}>
            <CustomerForm
              onSubmit={methods.handleSubmit(onSubmit)}
              allCities={allCities}
              allProvince={allProvince}
              loadingPayment={isLoading}
            />
          </FormProvider>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const province = await getProvince();
  const cities = await getCity();

  return {
    props: {
      province,
      cities,
    },
  };
}

export default Checkout;
