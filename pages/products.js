import { getProducts } from "../lib/api";
import ProductList from "../components/Products/ProductList";

const Products = ({ products }) => {
  return (
    <>
      <div
        className="relative flex items-center w-full h-[80vh] bg-center bg-cover"
        style={{
          backgroundImage: `url("/banner.jpg")`,
        }}
      >
        <span className="absolute top-0 left-0  block w-full h-full bg-black/50" />
        <div className="text-white z-10 p-6 md:p-0 md:pl-20 w-full md:w-7/12">
          <h3 className="text-5xl uppercase font-bold">Find Your Style</h3>
          <p className="text-2xl my-6">Get the most stylist products</p>
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
