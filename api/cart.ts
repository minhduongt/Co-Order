import {
  Cart,
  OrderCompleteResponse,
  OrderRequest,
  OrderResponse,
  ProductInMenuItem,
} from "types/cart";
import { PostResponse } from "types/request";
import { request } from "./utils";

const checkout = (cartOrder: OrderRequest, accessToken: string) => {
  const config = {
    headers: {
      authorization: "Bearer " + accessToken,
    },
  };
  return request.post<PostResponse<OrderResponse>>(`/order`, cartOrder, config);
};

const partyOrder = (cartOrder: OrderRequest, accessToken: string) => {
  const config = {
    headers: {
      authorization: "Bearer " + accessToken,
    },
  };
  return request.post<PostResponse<OrderResponse>>(
    `/party-orders`,
    cartOrder,
    config
  );
};

const joinParty = (
  partyOrderId: number,
  productInMenus: ProductInMenuItem[],
  shareLink: string,
  accessToken: string
) => {
  const config = {
    headers: {
      authorization: "Bearer " + accessToken,
    },
  };
  return request.post<PostResponse<OrderResponse>>(
    `/party-orders/join-party`,
    { partyOrderId, productInMenus, shareLink },
    config
  );
};

const completeOrder = (partyOrderId: number, accessToken: string) => {
  const config = {
    headers: {
      authorization: "Bearer " + accessToken,
    },
  };
  return request.post<PostResponse<OrderCompleteResponse>>(
    `/party-orders/${partyOrderId}/complete`,
    partyOrderId,
    config
  );
};

const cartApi = {
  partyOrder,
  joinParty,
  completeOrder,
  checkout,
};

export default cartApi;
