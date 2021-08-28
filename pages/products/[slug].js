import Link from "next/link";
import marked from "marked";
import { useRouter } from "next/router";
import useSWR from "swr";

import { getProducts, getMediaURL } from "@/lib/api";
import { priceFormatter } from "@/lib/formater";
import ImageCarousel from "@/components/Products/ImageCarousel";
import { useCart } from "@/contexts/CartContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import Meta from "@/components/Meta";

const Product = (props) => {
  const router = useRouter();
  const slug = router.query.slug;

  const { addItem, inCart } = useCart();

  const { data: product } = useSWR("product", () => getProducts(`/${slug}`), {
    initialData: props.product,
  });

  const keywords = product.categories.reduce((acc, prev) => {
    return `${acc}, ${prev.name.toLowerCase()}`;
  }, "merch, clothing, brand");

  const seo = {
    title: `${product.name} | Grandonk Merch`,
    keywords,
    description: product.description,
    shareImage: product.banner_image
      ? getMediaURL(product.banner_image.formats.medium)
      : getMediaURL(product.image[0].formats.medium),
    article: true,
  };

  if (!product) {
    return (
      <>
        <div className="w-full h-44 bg-secondary flex items-end"></div>
        <span className="block w-full h-8 rounded-b-lg bg-secondary" />
        <LoadingSpinner />
      </>
    );
  }

  return (
    <>
      <Meta seo={seo} />
      <div className="w-full h-44 bg-secondary flex items-end">
        <div className="container mx-auto px-6 lg:px-16">
          <h1 className="text-3xl md:text-5xl text-white font-semibold uppercase pl-6 py-1 border-l-4 border-primary">
            {product.name}
          </h1>
        </div>
      </div>
      <span className="block w-full h-8 rounded-b-lg bg-secondary" />
      <ImageCarousel images={product.image} />
      <div className="container mx-auto px-6 lg:px-16 pt-4 pb-10 flex justify-between flex-col md:flex-row-reverse space-y-10 md:space-y-0">
        <div className="w-full md:w-2/6">
          <p className="text-4xl text-right mb-8 font-semibold">
            {priceFormatter.format(product.price)}
          </p>
          <button
            className="inline-block text-white text-xl w-full px-3 py-4 bg-primary hover:bg-opacity-90 font-semibold tracking-wider disabled:bg-gray-400 disabled:pointer-events-none"
            onClick={() => addItem(product)}
            disabled={inCart(product.id)}
          >
            ADD TO CART
          </button>
          <h3 className="text-3xl font-semibold mb-4 mt-16">Categories</h3>
          <span className="block h-1 w-20 bg-primary"></span>
          <ul className="flex items-center py-6 px-1 mt-2">
            {product.categories.map((category) => (
              <li
                key={category.id}
                className="px-4 bg-secondary text-white hover:text-primary text-lg rounded"
              >
                <Link href={`/categories/${category.slug}`}>
                  <a>{category.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-3/5">
          <h3 className="text-3xl font-semibold mb-4">Product Detail</h3>
          <span className="block h-1 w-20 bg-primary"></span>
          <div className="prose max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: marked(product.detail) }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const products = await getProducts();

  const paths = products.map((product) => ({
    params: { slug: product.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(ctx) {
  const { slug } = ctx.params;

  const product = await getProducts(`/${slug}`);

  return {
    props: {
      product,
    },
    revalidate: 1,
  };
}

export default Product;
