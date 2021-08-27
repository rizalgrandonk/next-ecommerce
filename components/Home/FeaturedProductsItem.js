import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { getMediaURL } from "@/lib/api";
import { priceFormatter } from "@/lib/formater";

const FeaturedProductsItem = ({ product }) => {
  const { addItem, inCart } = useCart();

  return (
    <div className="w-full h-screen">
      <Image
        src={getMediaURL(product.banner_image.formats.large)}
        alt={product.name}
        placeholder="blur"
        blurDataURL={getMediaURL(product.banner_image.formats.thumbnail)}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        loading="lazy"
      />
      <div className="relative w-full h-full flex items-center bg-black/60">
        <div className="text-white z-10 p-6 md:p-0 md:pl-20 w-full md:w-7/12">
          <h3 className="text-5xl uppercase font-bold">{product.name}</h3>
          <p className="my-4 text-3xl font-bold text-primary">
            {priceFormatter.format(product.price)}
          </p>
          <p className="hidden md:block my-4">{product.description}</p>
          <button
            className="inline-block mr-4 px-5 py-3 bg-primary hover:bg-opacity-80 font-semibold tracking-wider disabled:bg-gray-400 disabled:pointer-events-none"
            onClick={() => addItem(product)}
            disabled={inCart(product.id)}
          >
            ADD TO CART
          </button>
          <Link href={`/products/${product.slug}`}>
            <a className="inline-block px-5 py-3 bg-secondary hover:bg-opacity-80 font-semibold tracking-wider">
              DISCOVER
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductsItem;
