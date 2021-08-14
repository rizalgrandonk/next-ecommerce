import Link from "next/link";
import { getMediaURL } from "../lib/api";

const LatestProductsItem = ({ product }) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return (
    <div className="block w-full md:px-14" style={{ height: "85vh" }}>
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
            <div className="w-full md:w-2/3 p-6 text-white">
              <h2 className="text-4xl mb-2 uppercase font-semibold">
                {product.name}
              </h2>
              <Link href={`/products/${product.slug}`}>
                <a>{"Click for more detail >"}</a>
              </Link>
            </div>
            <div className="flex justify-between items-center text-white w-full h-16 -mb-16 p-6 group-hover:mb-0 bg-primary transition-all duration-500">
              <div>
                <p className="text-black text-sm">Price</p>
                <p className="text-xl font-semibold">
                  {formatter.format(product.price)}
                </p>
              </div>
              <button className="inline-block px-3 py-2 bg-secondary transform hover:scale-105 font-semibold tracking-wider">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestProductsItem;
