import ProductItem from "./ProductItem";

const ProductList = ({ products }) => {
  return (
    <section className="container mx-auto px-6 md:px-16 pt-10 pb-10 flex items-center flex-wrap">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </section>
  );
};

export default ProductList;
