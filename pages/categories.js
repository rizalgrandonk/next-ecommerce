import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import Meta from "@/components/Meta";
import Banner from "../public/banner.jpg";
import { getCategories } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import CategoriesCarousel from "@/components/Categories/CategoriesCarousel";
import { FaAngleDoubleRight } from "react-icons/fa";

const Categories = (props) => {
  const { data: categories } = useSWR("categories", () => getCategories(), {
    initialData: props.categories,
  });

  if (!categories) {
    return <LoadingSpinner />;
  }
  const seo = {
    title: "Categories | Grandonk Merch",
    keywords: "merch, clothing, brand, categories",
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
          <h3 className="text-5xl uppercase font-bold">Find Your Style</h3>
          <p className="text-2xl my-6">Get the most stylist products</p>
        </div>
      </div>
      <div className="container mx-auto px-6 lg:px-16 pt-8 pb-10">
        <Link href="/products">
          <a className="flex items-center justify-end text-2xl space-x-2 text-primary hover:text-dark mb-10">
            <span className="text-lg hover:text-dark">All Products</span>
            <FaAngleDoubleRight />
          </a>
        </Link>
        <CategoriesCarousel categories={categories} />
      </div>
    </>
  );
};

export async function getStaticProps() {
  const categories = await getCategories();

  return {
    props: {
      categories,
    },
    revalidate: 1,
  };
}

export default Categories;
