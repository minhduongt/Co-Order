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
): Promise<SecondResponse<OrderResponse>> => {
  const config = {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  };
  const data = null;
  const res = request
    .patch(`/party-orders/${orderId}`, data, config)
    .then((res) => res.data);
  console.log("complete", res);

  return res;
};

export const finishPartyOrder = (
  orderId: number,
  accessToken: string
): Promise<SecondResponse<OrderResponse>> => {
  const config = {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  };
  const data = null;
  const res = request
    .patch(`/party-orders/${orderId}/finish`, data, config)
    .then((res) => res.data);

  return res;
};
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
  finishPartyOrder,
  completePartyOrder,
  getPartyOrderDetail,
  getPartyOrderByCode,
};

export default partyOrderApi;
