import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext({
  cartItems: [],
  cartQuantity: 0,
  cartTotal: 0,
  isCartOpen: false,
  setIsOpen: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
});

export const addCartItem = (cartItems, product) => {
  const existingItem = cartItems.find(
    (cartItem) => cartItem.id === product.id
  );

  if (existingItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === product.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...product, quantity: 1 }];
};

export const removeCartItem = (cartItems, product) => {
  const existingItem = cartItems.find(
    (cartItem) => cartItem.id === product.id
  );

  if (existingItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== product.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === product.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartQuantity, setCartQuantity] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    setCartQuantity(
      cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity,
        0
      )
    );

    setCartTotal(
      cartItems.reduce(
        (total, cartItem) =>
          total + cartItem.quantity * cartItem.price,
        0
      )
    );
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };
  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };
  const value = {
    cartItems,
    cartQuantity,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
  };
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
