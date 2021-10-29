import useSWR from "swr";
import Image from "next/image";
import { getProducts } from "@/lib/api";
import ProductList from "@/components/Products/ProductList";
import LoadingSpinner from "@/components/LoadingSpinner";
import Meta from "@/components/Meta";
import Banner from "../public/banner.jpg";
import { localize } from "@/lib/formater";
import { useRouter } from "next/router";

const Products = ({ products }) => {
  const { locale } = useRouter();

  // const { data: products } = useSWR(
  //   "products",
  //   () => getProducts("?_sort=created_at:desc"),
  //   { initialData: props.products }
  // );

  if (!products) {
    return <LoadingSpinner />;
  }
  const seo = {
    title: `${localize(locale, "products")} | Grandonk Merch`,
    keywords: "merch, clothing, brand, products",
  };

  return (
    <>
      <Meta seo={seo} />
      <div className="relative flex items-center w-full h-[80vh] bg-center bg-cover">
        <Image
          src={Banner}
          alt=""
          placeholder="blur"
          layout="fill"
          objectFit="cover"
          loading="lazy"
        />
        <span className="absolute top-0 left-0  block w-full h-full bg-black/50" />
        <div className="text-white z-10 p-6 md:p-0 md:pl-20 w-full md:w-7/12">
          <h1 className="text-6xl uppercase font-bold mb-6">
            {localize(locale, "products")}
          </h1>
          <h3 className="text-4xl capitalize font-semibold">
            {localize(locale, "bannerTitle")}
          </h3>
          <p className="text-2xl my-6">{localize(locale, "bannerSubTitle")}</p>
        </div>
      </div>
      <ProductList products={products} />;
    </>
  );
};

export async function getStaticProps() {
  const products = await getProducts("?_sort=created_at:desc");

  return {
    props: {
      products,
    },
    revalidate: 1,
  };
}

export default Products;
