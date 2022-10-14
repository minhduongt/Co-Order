import {
  Cart,
  CartItem,
  CustomerInfo,
  OrderRequest,
  ProductChild,
  ProductItem,
} from "types/cart";
import { Extra } from "types/product";

export const mapCartModelToOrderRequest = (
  cartModel: Cart,
  customer_info?: CustomerInfo
) => {
  let products_list: ProductItem[] = [];
  cartModel.items.forEach((cartItem) => {
    products_list.push(...mapCartItemToProduct(cartItem));
  });

  const orderCart: OrderRequest = {
    destination_location_id: 23,
    payment: 1,
    vouchers: [],
    customer_info: customer_info
      ? customer_info
      : {
          email: "duong.nt@reso.vn",
          name: "test customer",
          phone: "0764420250",
        },
    products_list,
  };

  return orderCart;
};

export const mapCartItemToProduct = (
  cartItem: CartItem,
  parentQuantity: number = 1
): ProductItem[] => {
  let products_list: ProductItem[] = [];
  let product_childs: ProductChild[] = [];
  if (cartItem.product_extras) {
    cartItem.product_extras.forEach((extra) => {
      product_childs.push(mapExtraToProductChild(extra));
    });
  }

  let parentItem: ProductItem = {
    master_product: cartItem.product.product_in_menu_id,
    quantity: cartItem.quantity * parentQuantity,
    product_childs: product_childs,
    description: "",
  };
  products_list.push(parentItem);
  return products_list;
};

export const mapExtraToProductChild = (extra: Extra): ProductChild => {
  let productChild: ProductChild = {
    product_in_menu_id: extra.product_in_menu_id,
    quantity: 1,
    description: "",
  };
  return productChild;
};
