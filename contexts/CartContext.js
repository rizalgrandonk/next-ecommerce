import { useState, createContext, useContext, useEffect } from "react";

export const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    let localCart = localStorage.getItem("cart");
    localCart = JSON.parse(localCart);
    if (localCart) setItems(localCart);
  }, []);

  useEffect(() => {
    setIsEmpty(items.length < 1);
    setTotalItems(items.reduce((prev, curr) => curr.quantity + prev, 0));
    setCartTotal(
      items.reduce((prev, curr) => curr.quantity * curr.price + prev, 0)
    );
  }, [items]);

  const addItem = (item, quantity = 1) => {
    const updated = [...items, { ...item, quantity: quantity }];
    setItems(updated);

    let stringCart = JSON.stringify(updated);
    localStorage.setItem("cart", stringCart);
  };

  const removeItem = (id) => {
    const filtered = items.filter((item) => item.id != id);
    setItems(filtered);

    let stringCart = JSON.stringify(filtered);
    localStorage.setItem("cart", stringCart);
  };

  const updateItemQuantity = (id, quantity) => {
    const updated = items.map((item) => {
      if (item.id == id) {
        return { ...item, quantity };
      }
      return item;
    });

    setItems(updated);

    let stringCart = JSON.stringify(updated);
    localStorage.setItem("cart", stringCart);
  };

  const updateItem = (id, property) => {
    const updated = items.map((item) => {
      if (item.id == id) {
        return { ...item, ...property };
      }
      return item;
    });

    setItems(updated);

    let stringCart = JSON.stringify(updated);
    localStorage.setItem("cart", stringCart);
  };

  const inCart = (id) => {
    const found = items.find((item) => item.id == id);
    if (!found) {
      return false;
    }
    return true;
  };

  const emptyCart = () => {
    setItems([]);

    localStorage.removeItem("cart");
  };

  const value = {
    items,
    addItem,
    removeItem,
    updateItem,
    updateItemQuantity,
    totalItems,
    cartTotal,
    inCart,
    emptyCart,
    isEmpty,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
