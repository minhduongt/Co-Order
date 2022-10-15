import { Cart, OrderRequest, OrderResponse } from "types/cart";
import { PostResponse } from "types/request";
import { request } from "./utils";

const prepareOrder = (cartPrepare: OrderRequest) => {
  return request.post<PostResponse<OrderResponse>>(
    `/orders/prepare`,
    cartPrepare
  );
};

const checkout = (cartOrder: OrderRequest, accessToken: string) => {
  const config = {
    headers: {
      authorization: "Bearer " + accessToken,
    },
  };
  return request.post<PostResponse<OrderResponse>>(`/order`, cartOrder, config);
};

const cartApi = {
  prepareOrder,
  checkout,
};

export default cartApi;
