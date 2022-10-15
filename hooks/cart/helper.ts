import {
  Cart,
  CartItem,
  CustomerInfo,
  OrderRequest,
  ProductChild,
  ProductInMenuItem,
} from "types/cart";

export const mapCartModelToOrderRequest = (cartModel: Cart) => {
  let products_list: ProductInMenuItem[] = [];
  cartModel.items.forEach((cartItem) => {
    products_list.push(...mapCartItemToProduct(cartItem));
  });

  const orderCart: OrderRequest = {
    endTime: "",
    paymentMethod: "",
    locationId: 1,
    menuId: 1,
    timeSlotId: 1,
    productInMenus: [],
    notes: "",
  };

  return orderCart;
};

export const mapCartItemToProduct = (
  cartItem: CartItem
): ProductInMenuItem[] => {
  let products_list: ProductInMenuItem[] = [];

  let parentItem: ProductInMenuItem = {
    id: cartItem.product.id,
    quantity: cartItem.quantity,
    description: "",
  };
  products_list.push(parentItem);
  return products_list;
};
