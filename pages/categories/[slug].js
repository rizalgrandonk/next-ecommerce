import Link from "next/link";
import { FaAngleDoubleRight } from "react-icons/fa";
import { getCategories, getMediaURL } from "../../lib/api";
import ProductList from "../../components/Products/ProductList";

const CategoryProducts = ({ category }) => {
  return (
    <>
      <div
        className="relative flex items-center justify-center w-full h-[80vh] bg-top bg-cover"
        style={{
          backgroundImage: `url(${getMediaURL(category.image.formats.large)})`,
        }}
      >
        <span className="absolute top-0 left-0  block w-full h-full bg-black/50" />
        <div className="text-white text-center z-10 p-16 w-1/2 bg-black/70">
          <h3 className="text-6xl uppercase font-bold">{category.name}</h3>
          <p className="text-3xl mt-6">Find Your Style</p>
        </div>
      </div>
      <div className="container mx-auto pt-8 px-6 md:px-16">
        <Link href="/products">
          <a className="flex items-center justify-end text-2xl space-x-2 text-primary hover:text-dark">
            <span className="text-lg hover:text-dark">All Products</span>
            <FaAngleDoubleRight />
          </a>
        </Link>
      </div>
      {category.products.length > 0 ? (
        <ProductList products={category.products} />
      ) : (
        <div className="min-h-[60vh] p-12">
          <h3 className="text-4xl text-center font-semibold">
            There is no products for this category
          </h3>
        </div>
      )}
    </>
  );
};

export async function getStaticPaths() {
  const categories = await getCategories();

  const paths = categories.map((category) => ({
    params: { slug: category.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(ctx) {
  const { slug } = ctx.params;
  const category = await getCategories(`/${slug}`);

  return {
    props: {
      category,
    },
  };
}

export default CategoryProducts;
