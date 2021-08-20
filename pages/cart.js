import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import CartItem from "../components/CartItem";
import { priceFormatter } from "../lib/formater";

const Cart = () => {
  const [error, setError] = useState(true);
  const { items, emptyCart, isEmpty, cartTotal, totalItems } = useCart();

  useEffect(() => {
    const errorCheck = () => {
      let errCount = 0;
      items.forEach((item) => {
        if (!item.size) {
          errCount++;
        }
      });
      if (errCount > 0) {
        return true;
      }
      return false;
    };

    setError(errorCheck());
  }, [items]);

  return (
    <>
      <div className="w-full h-44 bg-secondary flex items-end">
        <div className="container mx-auto px-6 md:px-16">
          <h1 className="text-3xl md:text-5xl text-white font-semibold uppercase pl-6 py-1 border-l-4 border-primary">
            Your Shopping Cart
          </h1>
        </div>
      </div>
      <span className="block w-full h-8 rounded-b-xl bg-secondary" />
      <div className="container mx-auto px-4 md:px-16 pt-4 pb-10 flex flex-col lg:flex-row justify-between">
        {isEmpty ? (
          <div className="w-full lg:w-3/5 lg:p-2">
            <div className="flex justify-center items-center w-full h-40 bg-white rounded-md overflow-hidden lg:p-4 mb-4 shadow-lg">
              <h2 className="text-3xl font-semibold">Your Cart Is Empty</h2>
            </div>
          </div>
        ) : (
          <div className="w-full lg:w-3/5 lg:p-2">
            {items.map((item) => (
              <CartItem key={item.id} product={item} setError={setError} />
            ))}
          </div>
        )}
        <div className="md:w-2/5 lg:p-2">
          <div className="flex flex-col w-full bg-white rounded-md overflow-hidden p-4 mb-4 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Summary</h3>
            <div className="w-full flex justify-between mb-4">
              <span className="text-lg">
                Sub Total ({totalItems} {totalItems > 1 ? "Items" : "Item"})
              </span>
              <span className="text-lg font-semibold">
                {priceFormatter.format(cartTotal)}
              </span>
            </div>
            <hr className="mb-4" />
            <button
              disabled={error || isEmpty}
              className="text-white px-5 py-3 mb-4 bg-primary disabled:bg-gray-400 hover:bg-opacity-90 font-semibold tracking-wider disabled:pointer-events-none"
            >
              Checkout
            </button>
            <button
              onClick={emptyCart}
              disabled={isEmpty}
              className="text-white px-5 py-3 bg-secondary disabled:bg-gray-400 hover:bg-opacity-90 font-semibold tracking-wider disabled:pointer-events-none"
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
