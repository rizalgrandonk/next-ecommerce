import { useState } from "react";
import { useCart } from "react-use-cart";
import CartItem from "../components/CartItem";
import { priceFormatter } from "../lib/formater";

const Cart = () => {
  const [error, setError] = useState(false);
  const { items, emptyCart, isEmpty, cartTotal, totalItems } = useCart();

  return (
    <>
      <div className="w-full h-48 bg-secondary flex items-end">
        <div className="container mx-auto px-6 md:px-16">
          <h1 className="text-3xl md:text-5xl text-white font-semibold uppercase pl-6 py-1 border-l-4 border-primary">
            Your Shopping Cart
          </h1>
        </div>
      </div>
      <span className="block w-full h-12 rounded-b-xl bg-secondary" />
      <div className="container mx-auto px-6 md:px-16 pt-8 pb-10 flex justify-between">
        {isEmpty ? (
          <div className="w-3/5 p-2">
            <div className="flex justify-center items-center w-full h-40 bg-white rounded-md overflow-hidden p-4 mb-4 shadow-lg">
              <h2 className="text-3xl font-semibold">Your Cart Is Empty</h2>
            </div>
          </div>
        ) : (
          <div className="w-3/5 p-2">
            {items.map((item) => (
              <CartItem key={item.id} product={item} setError={setError} />
            ))}
          </div>
        )}
        <div className="w-2/5 p-2">
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
              className="text-white px-5 py-3 mb-4 bg-primary disabled:bg-gray-400 hover:bg-opacity-90 font-semibold tracking-wider"
            >
              Checkout
            </button>
            <button
              onClick={emptyCart}
              disabled={isEmpty}
              className="text-white px-5 py-3 bg-secondary disabled:bg-gray-400 hover:bg-opacity-90 font-semibold tracking-wider"
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
