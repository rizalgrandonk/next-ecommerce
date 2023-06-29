import Image from "next/image";
import Link from "next/link";
import { FaAngleDoubleRight } from "react-icons/fa";

import CategoryList from "@/components/Home/CategoryList";
import FeaturedProductsCarousel from "@/components/Home/FeaturedProductsCarousel";
import LatestProductsCarousel from "@/components/Home/LatestProductsCarousel";
import LoadingSpinner from "@/components/LoadingSpinner";
import Meta from "@/components/Meta";
import { getCategories, getProducts } from "@/lib/api";
import { localize } from "@/lib/formater";
import { useRouter } from "next/router";

export default function Home({ products, categories }) {
  const { locale } = useRouter();

  const featuredProducts = products.filter(
    (product) => product.featured === true
  );

  const latestProducts = products.length > 4 ? products.slice(0, 4) : products;

  if (!products || !categories) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Meta />
      <FeaturedProductsCarousel products={featuredProducts} />

      <div className="w-full py-16 flex flex-col justify-center items-center">
        <h1 className="text-5xl md:text-7xl text-center font-light uppercase tracking-widest mb-2">
          Grandonk Merch
        </h1>
        <span className="block w-1/2 h-2 bg-primary"></span>
      </div>

      <div className="relative">
        <span className="block w-2/5 h-1/4 absolute right-0 top-0 bg-secondary" />
        <section
          id="category"
          className="container mx-auto px-6 lg:px-16 pt-10 pb-10"
        >
          <h2 className="text-3xl md:text-5xl w-1/2 text-dark mb-10 font-semibold tracking-wide uppercase">
            {localize(locale, "categories")}
          </h2>
          <CategoryList categories={categories} />
        </section>
      </div>

      <section className="w-full flex flex-col md:items-center md:flex-row space-y-10 mt-12 mb-12">
        <div className="relative w-5/6 md:w-1/2 h-100 bg-secondary">
          <div className="absolute w-[95%] h-[95%] -right-12 -bottom-12">
            <Image
              src="/banner.jpg"
              alt=""
              placeholder="blur"
              blurDataURL="/banner.jpg"
              layout="fill"
              objectFit="cover"
              loading="lazy"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 h-full flex justify-center items-center">
          <div className="w-full md:w-1/2">
            <p className="text-sm text-center my-6">
              {localize(locale, "bannerSubTitle")}
            </p>
            <h3 className="text-dark text-center text-6xl font-bold my-4">
              {localize(locale, "bannerTitle")}
            </h3>
            <Link href="/products">
              <a className="flex items-center justify-center my-10 text-2xl space-x-2 text-primary hover:text-dark">
                <span className="text-lg underline hover:text-dark">
                  {localize(locale, "allProducts")}
                </span>
                <FaAngleDoubleRight />
              </a>
            </Link>
          </div>
        </div>
      </section>

      <div className="relative">
        <span className="block w-1/5 h-2/4 absolute -right-0 top-0 md:top-16 bg-secondary" />
        <section
          id="latest-product"
          className="container mx-auto px-6 lg:px-16 pt-16 md:pt-24 pb-10"
        >
          <h2 className="text-3xl md:text-5xl w-1/2 text-dark mb-10 font-semibold tracking-wide uppercase">
            {localize(locale, "latestProducts")}
          </h2>
          <LatestProductsCarousel products={latestProducts} />
        </section>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const products = await getProducts("?_sort=created_at:desc");
  const categories = await getCategories();

  return {
    props: {
      products,
      categories,
    },
    revalidate: 20,
  };
}
