import React from "react";
import { Cart, CartItem } from "types/cart";
import { Extra } from "types/product";

const useAddCartItem = (
  cartItem: CartItem,
  currentCart: Cart,
  size?: string,
  extraList?: Extra[]
) => {
  const cartItems = currentCart?.items ?? [];
  let addedItem: CartItem = cartItem;
  //If size then add child product of that size
  if (size && cartItem.product.child_products) {
    const childItem = cartItem.product.child_products.find(
      (pro) => pro.attributes.size == size
    );
    if (childItem)
      addedItem = { product: childItem, quantity: 1, description: "" };
  }
  //If extra(s) is(are) checked then add that(these) extra(s) into product_extras of cart item
  if (extraList) {
    if (extraList.length > 0)
      addedItem = { ...addedItem, product_extras: extraList };
  }

  // find index to check
  const updateIndex = cartItems.findIndex(
    (item) =>
      item.product.product_id === addedItem.product.product_id &&
      item.product_extras?.every((e) => e.product_id) ===
        addedItem.product_extras?.every((e) => e.product_id)
  );

  // cartItems.findIndex((item, index) =>
  //   console.log(
  //     "at index: " +
  //       index +
  //       " " +
  //       (item.product.product_id === addedItem.product.product_id &&
  //         item.product_extras?.every((e) => e.product_id) ===
  //           addedItem.product_extras?.every((e) => e.product_id))
  //   )
  // );

  // more than -1 means existed then update quantity or else push to array
  if (updateIndex > -1) {
    const updateItem = cartItems[updateIndex];
    cartItems[updateIndex] = {
      ...cartItems[updateIndex],
      quantity: addedItem.quantity + updateItem.quantity,
      product_extras: addedItem.product_extras,
    };
  } else {
    cartItems.push(addedItem);
  }
  const newCart: Cart = { items: cartItems, total: 0, totalItem: 0 };
  return newCart;
};

export default useAddCartItem;
