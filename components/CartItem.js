import { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import { FaMinusSquare, FaPlusSquare, FaTrash } from "react-icons/fa";
import { getMediaURL } from "../lib/api";
import { priceFormatter } from "../lib/formater";

const CartItem = ({ product, setError }) => {
  const { updateItemQuantity, updateItem, removeItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    updateItem(product.id, { size: selectedSize });
    if (selectedSize === "") {
      setError(true);
    } else {
      setError(false);
    }
  }, [selectedSize, updateItem, product.id, setError]);

  return (
    <div className="flex w-full h-44 bg-white rounded-md overflow-hidden p-4 mb-4 shadow-lg">
      <div
        className="h-full w-1/6 bg-cover rounded"
        style={{
          backgroundImage: `url(${getMediaURL(
            product.image[0].formats.medium
          )})`,
        }}
      ></div>
      <div className="h-full flex-grow px-4 py-1 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-light">{product.name}</h2>
          <p className="text-md font-semibold">
            {priceFormatter.format(product.price)}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center">
              <label htmlFor="size" className="text-lg mr-2">
                Size :
              </label>
              <select
                id="size"
                className="bg-gray-200 px-2 text-lg font-medium rounded"
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option defaultValue value="">
                  Choose Size
                </option>
                {product.sizeOptions.map((option) => (
                  <option key={option.id} value={option.size}>
                    {option.size}
                  </option>
                ))}
              </select>
            </div>
            {selectedSize === "" && (
              <span className="text-xs text-red-600">Choose a size</span>
            )}
          </div>
          <div className="flex items-center">
            <button
              className="text-2xl mr-10 text-gray-600"
              onClick={() => removeItem(product.id)}
            >
              <FaTrash />
            </button>
            <button
              disabled={product.quantity === 1}
              onClick={() =>
                updateItemQuantity(product.id, product.quantity - 1)
              }
              className="text-2xl text-primary disabled:text-gray-300"
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
              className="text-2xl text-primary"
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
