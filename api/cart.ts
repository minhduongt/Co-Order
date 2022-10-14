import { Cart, OrderRequest, OrderResponse } from "types/cart";
import { PostResponse } from "types/request";
import { request } from "./utils";

const prepareOrder = (cartPrepare: OrderRequest) => {
  return request.post<PostResponse<OrderResponse>>(
    `/orders/prepare`,
    cartPrepare
  );
};

const checkout = (cartOrder: OrderRequest) => {
  return request.post<PostResponse<OrderResponse>>(`/orders`, cartOrder);
};

const cartApi = {
  prepareOrder,
  checkout,
};

export default cartApi;
