import { useCart } from "@/contexts/CartContext";
import { getProducts } from "@/lib/api";
import useSWR from "swr";
import LoadingSpinner from "../LoadingSpinner";
import ProductList from "../Products/ProductList";

const CartRecomen = () => {
  const { items, isEmpty } = useCart();

  const getCategorySlugs = (items) => {
    let slugs = [];
    items.forEach((item) => {
      slugs = [...slugs, ...item.categories.map((category) => category.slug)];
    });
    return [...new Set(slugs)];
  };

  const getParameter = (items) => {
    const slugs = getCategorySlugs(items);
    const parameters = slugs.map(
      (slug, index) => `_where[categories.slug][${index}]=${slug}`
    );
    return `?${parameters.join("&")}`;
  };

  const filterByCartItems = (items, products) => {
    const filtered = products.filter((product) => {
      return !items.some((item) => {
        return item.slug === product.slug;
      });
    });
    return filtered;
  };

  const getRecomen = async (items, isEmpty) => {
    if (isEmpty) {
      const products = await getProducts("?featured=true");
      return products;
    }
    const param = getParameter(items);
    const products = await getProducts(param);
    const filtered = filterByCartItems(items, products);
    return filtered;
  };

  const { data: products } = useSWR("products", () =>
    getRecomen(items, isEmpty)
  );

  if (!products) {
    return (
      <div className="container mx-auto px-4 lg:px-16 pt-4 pb-10">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <h2 className="text-4xl font-semibold text-gray-900 text-center mt-10">
        You May Like
      </h2>
      <ProductList products={products} />
    </>
  );
};

export default CartRecomen;
