import { TArea } from "types/area";
import { OrderResponse } from "types/cart";
import { OrderStatusEnum } from "types/constant";
import { BaseResponse, SecondResponse } from "types/request";
import { request } from "./utils";

export const getCurrentPartyOrder = (
  orderId: number,
  accessToken: string,
  params?: any
): Promise<SecondResponse<OrderResponse>> =>
  request
    .get(`/party-orders/me`, {
      params,
      headers: {
        authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => res.data);

export const getPartyOrderDetail = (
  orderId: number,
  accessToken: string,
  params?: any
): Promise<SecondResponse<OrderResponse>> =>
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
  getPartyOrderDetail,
  getPartyOrderByCode,
};

export default partyOrderApi;
