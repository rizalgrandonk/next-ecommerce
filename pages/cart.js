import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCart } from "@/contexts/CartContext";
import CartItem from "@/components/Cart/CartItem";
import { localize, priceFormatter } from "@/lib/formater";
import Meta from "@/components/Meta";

const Cart = () => {
  const [error, setError] = useState(true);
  const { items, emptyCart, isEmpty, cartTotal, totalItems } = useCart();
  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    const errorCheck = () => {
      let errCount = 0;
      items.forEach((item) => {
        if (!item.size) {
          errCount++;
        }
      });

      if (errCount > 0) {
        setError(true);
      } else {
        setError(false);
      }
    };

    errorCheck();
  }, [items]);

  const seo = {
    title: `${localize(locale, "cart")} | Grandonk Merch`,
    keywords: "merch, clothing, brand, cart",
  };

  return (
    <>
      <Meta seo={seo} />
      <div className="w-full h-44 bg-secondary flex items-end">
        <div className="container mx-auto px-6 lg:px-16">
          <h1 className="text-3xl md:text-5xl text-white font-semibold uppercase pl-6 py-1 border-l-4 border-primary">
            {localize(locale, "yourCart")}
          </h1>
        </div>
      </div>
      <span className="block w-full h-8 rounded-b-xl bg-secondary" />
      <div className="container mx-auto px-4 lg:px-16 pt-4 pb-10 flex flex-col lg:flex-row justify-between gap-4">
        {isEmpty ? (
          <div className="w-full lg:w-3/5">
            <div className="flex justify-center items-center w-full h-40 bg-white rounded-md overflow-hidden lg:p-4 mb-4 shadow-lg">
              <h2 className="text-3xl font-semibold">
                {localize(locale, "yourCartEmpty")}
              </h2>
            </div>
          </div>
        ) : (
          <div className="w-full lg:w-3/5">
            {items.map((item) => (
              <CartItem key={item.id} product={item} setError={setError} />
            ))}
          </div>
        )}
        <div className="w-full lg:w-2/5">
          <div className="flex flex-col w-full bg-white rounded-md overflow-hidden p-4 mb-4 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              {localize(locale, "summary")}
            </h3>
            <div className="w-full flex justify-between mb-4">
              <span className="text-lg">
                Sub Total ({`${totalItems} ${localize(locale, "items")}`})
              </span>
              <span className="text-lg font-semibold">
                {priceFormatter.format(cartTotal)}
              </span>
            </div>
            <hr className="mb-4" />
            <button
              onClick={() => router.push("/checkout")}
              disabled={error || isEmpty}
              className="block text-center text-white px-5 py-3 mb-4 bg-primary disabled:bg-gray-400 hover:bg-opacity-90 font-semibold tracking-wider disabled:pointer-events-none"
            >
              Checkout
            </button>
            <button
              onClick={emptyCart}
              disabled={isEmpty}
              className="text-white px-5 py-3 bg-secondary disabled:bg-gray-400 hover:bg-opacity-90 font-semibold tracking-wider disabled:pointer-events-none"
            >
              {localize(locale, "emptyCart")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
