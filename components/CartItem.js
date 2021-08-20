import Link from "next/link";
import { useCart } from "../contexts/CartContext";
import { FaMinusSquare, FaPlusSquare, FaTrash } from "react-icons/fa";
import { getMediaURL } from "../lib/api";
import { priceFormatter } from "../lib/formater";

const CartItem = ({ product }) => {
  const { updateItemQuantity, updateItem, removeItem } = useCart();

  return (
    <div className="flex w-full h-60 lg:h-44 bg-white rounded-md overflow-hidden p-2 mb-4 shadow-lg">
      <Link href={`/products/${product.slug}`}>
        <a
          className="block h-full w-2/5 md:w-1/5 bg-cover rounded bg-center"
          style={{
            backgroundImage: `url(${getMediaURL(
              product.image[0].formats.medium
            )})`,
          }}
        ></a>
      </Link>
      <div className="h-full flex-grow px-4 py-1 flex flex-col justify-between items-start lg:items-stretch">
        <div className="flex-grow">
          <Link href={`/products/${product.slug}`}>
            <a className="text-xl md:text-2xl font-light">{product.name}</a>
          </Link>
          <p className="text-md font-semibold">
            {priceFormatter.format(product.price)}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row flex-grow justify-between items-end">
          <div>
            <div className="flex items-center">
              <label htmlFor="size" className="md:text-lg mr-2">
                Size :
              </label>
              <select
                id="size"
                className="bg-gray-200 px-2 md:text-lg font-medium rounded"
                onChange={(e) =>
                  updateItem(product.id, { size: e.target.value })
                }
              >
                <option defaultValue value="">
                  Sizes
                </option>
                {product.sizeOptions.map((option) => (
                  <option
                    selected={option.size == product.size}
                    key={option.id}
                    value={option.size}
                  >
                    {option.size}
                  </option>
                ))}
              </select>
            </div>
            {!product.size || product.size == "" ? (
              <span className="text-xs text-red-600">Choose a size</span>
            ) : (
              ""
            )}
          </div>
          <div className="flex items-center">
            <button
              className="text-xl md:text-2xl mr-6 text-gray-600"
              onClick={() => removeItem(product.id)}
            >
              <FaTrash />
            </button>
            <button
              disabled={product.quantity === 1}
              onClick={() =>
                updateItemQuantity(product.id, product.quantity - 1)
              }
              className="text-xl md:text-2xl text-primary disabled:text-gray-300 disabled:pointer-events-none"
            >
              <FaMinusSquare />
            </button>
            <span className="block w-8 mx-2 text-center text-lg font-semibold border-b-2 border-gray-600">
              {product.quantity}
            </span>
            <button
              onClick={() =>
                updateItemQuantity(product.id, product.quantity + 1)
              }
              className="text-xl md:text-2xl text-primary"
            >
              <FaPlusSquare />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
