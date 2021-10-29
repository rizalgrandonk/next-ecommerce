import "tailwindcss/tailwind.css";
import "react-multi-carousel/lib/styles.css";
import App from "next/app";
import useSWR from "swr";
import "../styles/global.css";
import { CartProvider } from "@/contexts/CartContext";
import { getCategories } from "@/lib/api";
import Layout from "@/components/Layout";

function MyApp({ Component, pageProps }) {
  // const { data: categories } = useSWR("categories", () => getCategories(), {
  //   initialData: pageProps.categories,
  // });

  // const { categories } = pageProps;

  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}

export default MyApp;
