import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { getMediaURL } from "@/lib/api";
import { localize, priceFormatter } from "@/lib/formater";
import { useRouter } from "next/router";

const ProductItem = ({ product }) => {
  const { locale } = useRouter();
  const { addItem, inCart } = useCart();
  return (
    <div className="block w-1/2 h-[40vh] lg:w-1/3 lg:h-[80vh] py-4 px-2 lg:px-6">
      <div className="relative w-full h-full shadow-md overflow-hidden group">
        <div className="w-full h-full transition-all duration-500 transform group-hover:scale-125">
          <Image
            src={getMediaURL(product.image[0].formats.medium)}
            alt={product.name}
            placeholder="blur"
            blurDataURL={getMediaURL(product.image[0].formats.thumbnail)}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-black/40 transition-all duration-500">
          <div className="absolute bottom-0 left-0 w-full">
            <div className="w-full p-1 lg:p-4 text-white">
              <h2 className="text-lg lg:text-2xl lg:mb-2 uppercase font-semibold">
                {product.name}
              </h2>
              <span className="text-xs lg:text-base px-2 font-medium rounded-full border-2 border-primary">
                {`${localize(locale, "price")} | ${priceFormatter.format(
                  product.price
                )}`}
              </span>
              <Link href={`/products/${product.slug}`}>
                <a className="block mt-2 lg:mt-5 text-xs lg:text-base">
                  {`${localize(locale, "clickForDetail")} >`}
                </a>
              </Link>
            </div>

            <div className="flex justify-between items-center space-x-4 text-white w-full h-8 lg:h-16 md:-mb-16 p-1 lg:p-3 group-hover:mb-0 bg-primary transition-all duration-500">
              <button
                className="inline-block w-full h-full bg-secondary hover:bg-opacity-90 font-semibold tracking-wider text-xs lg:text-base p-1
              disabled:bg-gray-400 disabled:pointer-events-none uppercase"
                onClick={() => addItem(product)}
                disabled={inCart(product.id)}
              >
                {localize(locale, "addToCart")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
