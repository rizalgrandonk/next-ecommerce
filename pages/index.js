import { getProducts } from "../lib/api";

export default function Home({ products }) {
  const featuredProducts = products.filter(
    (product) => product.featured === true
  );

  const latestProducts = products.length > 4 ? products.slice(0, 4) : products;

  return (
    <section className="container mx-auto px-16">
      <h3>Featured :</h3>
      {featuredProducts.map((product) => (
        <p key={product.id}>{product.name}</p>
      ))}

      <h3>Latest Product :</h3>
      {latestProducts.map((product) => (
        <p key={product.id}>{product.name}</p>
      ))}
    </section>
  );
}

export async function getStaticProps() {
  const products = await getProducts("?_sort=created_at:desc");

  return {
    props: {
      products,
    },
  };
}
