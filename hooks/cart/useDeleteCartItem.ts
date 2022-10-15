import React from "react";
import { Cart, CartItem } from "types/cart";

const useDeleteCartItem = ({ product }: CartItem, currentCart: Cart) => {
  const cartItems = currentCart?.items ?? [];
  const deleteIndex = cartItems.findIndex(
    (item) => item.product.id === product.id
  );

  if (deleteIndex > -1) {
    cartItems.splice(deleteIndex, 1);
  }
  const newCart: Cart = { items: cartItems, total: 0, totalItem: 0 };
  return newCart;
};

export default useDeleteCartItem;
