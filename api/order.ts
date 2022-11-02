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

const completeOrder = (id: number, accessToken: string) => {
  return request
    .put<BaseResponse<any>>(`/orders`, {
      id: id,
      status: OrderStatusEnum.FINISHED,
      headers: {
        authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => res.data);
};
const orderApi = {
  getOrderDetail,
  completeOrder,
};

export default orderApi;
