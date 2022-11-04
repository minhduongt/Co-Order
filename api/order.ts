import { TArea } from "types/area";
import { OrderResponse } from "types/cart";
import { OrderStatusEnum } from "types/constant";
import { TOrderDetail } from "types/order";
import { BaseResponse, SecondResponse } from "types/request";
import { request } from "./utils";

export const getOrderDetail = (
  orderId: number,
  accessToken: string,
  params?: any
): Promise<TOrderDetail> =>
  request
    .get(`/orders/${orderId}/details`, {
      params,
      headers: {
        authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => res.data);

const completeOrder = (id: number, accessToken: string, status: OrderStatusEnum): Promise<BaseResponse<any>> => {
  const config = {
    headers: {
      authorization: "Bearer " + accessToken,
    },

  }
  const data = {
    id: id,
    status: status,
  }

  return request
    .put(`/orders`,
      data,
      config
    )
    .then((res) => res.data);
};
const orderApi = {
  getOrderDetail,
  completeOrder,
};

export default orderApi;
