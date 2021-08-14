import Link from "next/link";
import { getMediaURL } from "../lib/api";

const FeaturedProductsItem = ({ product }) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return (
    <div
      className="relative flex items-center w-full h-screen bg-center bg-cover"
      style={{
        backgroundImage: `url(${getMediaURL(
          product.banner_image.formats.large
        )})`,
      }}
    >
      <span className="absolute top-0 left-0  block w-full h-full bg-black opacity-50" />
      <div className="text-white z-10 p-6 md:p-0 md:pl-20 w-full md:w-7/12">
        <h3 className="text-5xl uppercase font-bold">{product.name}</h3>
        <p className="my-4 text-3xl font-bold text-primary">
          {formatter.format(product.price)}
        </p>
        <p className="hidden md:block my-4">{product.description}</p>
        <button className="inline-block mr-4 px-5 py-3 bg-primary transform hover:scale-110 font-semibold tracking-wider">
          ADD TO CART
        </button>
        <Link href={`/products/${product.slug}`}>
          <a className="inline-block px-5 py-3 bg-secondary transform hover:scale-110 font-semibold tracking-wider">
            DISCOVER
          </a>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProductsItem;
