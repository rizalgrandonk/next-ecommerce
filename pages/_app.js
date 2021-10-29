import "tailwindcss/tailwind.css";
import "react-multi-carousel/lib/styles.css";
import "../styles/global.css";
import { CartProvider } from "@/contexts/CartContext";
import Layout from "@/components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}

export default MyApp;
