import { TArea } from "types/area";
import { OrderResponse } from "types/cart";
import { OrderStatusEnum } from "types/constant";
import { TOrderDetail, TPartyOrderDetail } from "types/order";
import { BaseResponse, SecondResponse } from "types/request";
import { request } from "./utils";

export const getPartyOrderDetail = (
  orderId: number,
  accessToken: string,
  params?: any
): Promise<TPartyOrderDetail> =>
  request
    .get(`/party-orders/${orderId}/details`, {
      params,
      headers: {
        authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => res.data);

export const completePartyOrder = (
  orderId: number,
  accessToken: string
): Promise<SecondResponse<OrderResponse>> =>
  request
    .patch(`/party-orders/${orderId}`, {
      headers: {
        authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => res.data);

export const getPartyOrderByCode = (
  partyCode: string,
  accessToken: string,
  params?: any
): Promise<SecondResponse<OrderResponse>> =>
  request
    .get(`/party-orders/${partyCode}`, {
      params,
      headers: {
        authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => res.data);

const partyOrderApi = {
  completePartyOrder,
  getPartyOrderDetail,
  getPartyOrderByCode,
};

export default partyOrderApi;
