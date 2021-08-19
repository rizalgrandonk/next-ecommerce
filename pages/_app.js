import "tailwindcss/tailwind.css";
import "react-multi-carousel/lib/styles.css";
import { CartProvider } from "react-use-cart";
import "../styles/global.css";
import App from "next/app";
import { getCategories } from "../lib/api";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Layout categories={pageProps.categories}>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}

MyApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx);
  const categories = await getCategories();
  return { ...appProps, pageProps: { categories } };
};

export default MyApp;
