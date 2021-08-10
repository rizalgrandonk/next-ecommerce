import "tailwindcss/tailwind.css";
import App from "next/app";
import { getCategories } from "../lib/api";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout categories={pageProps.categories}>
      <Component {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx);
  const categories = await getCategories();
  return { ...appProps, pageProps: { categories } };
};

export default MyApp;
