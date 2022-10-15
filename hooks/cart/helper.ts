import {
  Cart,
  CartItem,
  CustomerInfo,
  OrderRequest,
  ProductChild,
  ProductInMenuItem,
} from "types/cart";

export const mapCartModelToOrderRequest = (
  cartModel: Cart,
  timeSlotId: string,
  menuId: number,
  locationId: number
) => {
  let productInMenus: ProductInMenuItem[] = [];
  cartModel.items.forEach((cartItem) => {
    productInMenus.push(...mapCartItemToProduct(cartItem));
  });

  const orderCart: OrderRequest = {
    endTime: null,
    paymentMethod: "CASH",
    locationId: locationId,
    menuId: menuId,
    timeSlotId: Number.parseInt(timeSlotId),
    productInMenus: productInMenus,
    notes: "",
  };
  console.log();

  return orderCart;
};

export const mapCartItemToProduct = (
  cartItem: CartItem
): ProductInMenuItem[] => {
  let productInMenus: ProductInMenuItem[] = [];

  let parentItem: ProductInMenuItem = {
    id: cartItem.product.id,
    quantity: cartItem.quantity,
    description: "",
  };
  productInMenus.push(parentItem);
  return productInMenus;
};
