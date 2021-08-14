import Link from "next/link";
import Image from "next/image";
import { FaAngleDoubleRight } from "react-icons/fa";
import { getProducts, getCategories } from "../lib/api";
import FeaturedProductsCarousel from "../components/FeaturedProductsCarousel";
import LatestProductsCarousel from "../components/LatestProductsCarousel";
import CategoryCarousel from "../components/CategoriesCarousel";

export default function Home({ products, categories }) {
  const featuredProducts = products.filter(
    (product) => product.featured === true
  );

  const latestProducts = products.length > 4 ? products.slice(0, 4) : products;

  return (
    <>
      <FeaturedProductsCarousel products={featuredProducts} />
      <div className="relative">
        <span className="block w-2/5 h-1/4 md:h-2/5 absolute -right-0 -top-0 bg-secondary" />
        <section
          id="category"
          className="container mx-auto px-6 md:px-16 pt-16 md:pt-24"
        >
          <h2 className="text-3xl md:text-5xl w-max text-dark mb-10 font-semibold tracking-wide uppercase">
            Categories
          </h2>
          <CategoryCarousel categories={categories} />
        </section>
      </div>

      <section className="w-full flex flex-col md:items-center md:flex-row space-y-10 mt-16 md:mt-24">
        <div className="relative w-5/6 md:w-1/2 h-100 bg-secondary">
          <div className="absolute w-full h-full -right-12 -bottom-12">
            <Image src="/banner.jpg" alt="" layout="fill" objectFit="cover" />
          </div>
        </div>
        <div className="w-full md:w-1/2 h-full flex justify-center items-center">
          <div className="w-1/2">
            <p className="text-sm text-center my-6">
              Get the most stylist products
            </p>
            <h3 className="text-dark text-center text-6xl font-bold my-4">
              Find your style
            </h3>
            <Link href="/products">
              <a className="flex items-center justify-center my-10 text-2xl space-x-2">
                <span className="text-lg underline hover:text-dark">
                  See All Products
                </span>
                <FaAngleDoubleRight />
              </a>
            </Link>
          </div>
        </div>
      </section>

      <div className="relative">
        <span className="block w-1/5 h-1/4 md:h-2/5 absolute -right-0 top-0 md:top-16 bg-secondary" />
        <section
          id="latest-product"
          className="container mx-auto px-6 md:px-16 pt-16 md:pt-36 pb-16"
        >
          <h2 className="text-3xl md:text-5xl w-max text-dark mb-10 font-semibold tracking-wide uppercase">
            Latest Products
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
  };
}
