import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { getMediaURL } from "@/lib/api";
import { localize, priceFormatter } from "@/lib/formater";
import { useRouter } from "next/router";

const LatestProductsItem = ({ product, slide, currentSlide }) => {
  const { locale } = useRouter();
  const { addItem, inCart } = useCart();

  return (
    <div className="block w-full h-[80vh] md:h-screen px-1 lg:px-8">
      <div className="relative w-full h-full shadow-md overflow-hidden group">
        <div className="w-full h-full transition-all duration-500 transform group-hover:scale-125 bg-cover bg-center">
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
        <div className="absolute inset-0 bg-black bg-opacity-30 transition-all duration-500">
          <div className="absolute bottom-0 left-0 w-full">
            <div className="w-full lg:w-3/4 p-4 lg:p-6 text-white">
              <h2 className="text-4xl mb-3 uppercase font-semibold">
                {product.name}
              </h2>
              <span className="px-3 py-1 font-medium text-xl rounded-full border-2 border-primary">
                {`${localize(locale, "price")} | ${priceFormatter.format(
                  product.price
                )}`}
              </span>
              <Link href={`/products/${product.slug}`}>
                <a className="block mt-6">
                  {`${localize(locale, "clickForDetail")} >`}
                </a>
              </Link>
            </div>
            <div
              className={`flex justify-between items-center space-x-4 text-white w-full h-20 p-4 md:-mb-20 md:group-hover:mb-0 bg-primary transition-all duration-500 ${
                currentSlide == slide ? "mb-0" : "-mb-20"
              }`}
            >
              <button
                className="inline-block w-full h-full bg-secondary hover:bg-opacity-90 font-semibold tracking-wider disabled:bg-gray-400 disabled:pointer-events-none uppercase"
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

export default LatestProductsItem;
