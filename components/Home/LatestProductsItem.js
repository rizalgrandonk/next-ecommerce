import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { getMediaURL } from "../../lib/api";
import { priceFormatter } from "../../lib/formater";

const LatestProductsItem = ({ product }) => {
  return (
    <div className="block w-full h-[80vh] md:h-screen px-1 md:px-8">
      <div className="relative w-full h-full shadow-md overflow-hidden group">
        <div
          className="w-full h-full transition-all duration-500 transform group-hover:scale-125 bg-cover bg-center"
          style={{
            backgroundImage: `url(${getMediaURL(
              product.image[0].formats.medium
            )})`,
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 transition-all duration-500">
          <div className="absolute bottom-0 left-0 w-full">
            <div className="w-full md:w-3/4 p-6 text-white">
              <h2 className="text-4xl mb-2 uppercase font-semibold">
                {product.name}
              </h2>
              <span className="px-3 font-medium text-xl rounded-full border-2 border-primary">
                Price | {priceFormatter.format(product.price)}
              </span>
              <Link href={`/products/${product.slug}`}>
                <a className="block text-sm mt-2">
                  {"Click for more detail >"}
                </a>
              </Link>
            </div>
            <div className="flex justify-between items-center space-x-4 text-white w-full h-16 -mb-16 p-4 group-hover:mb-0 bg-primary transition-all duration-500">
              <button className="inline-block w-3/4 px-3 py-2 bg-secondary hover:bg-opacity-80 font-semibold tracking-wider">
                ADD TO CART
              </button>
              <button className="inline-block font-semibold text-secondary text-4xl hover:scale-125 transition-all">
                <FaRegHeart />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestProductsItem;
