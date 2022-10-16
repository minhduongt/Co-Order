import { TArea } from "types/area";
import { OrderResponse } from "types/cart";
import { OrderStatusEnum } from "types/constant";
import { BaseResponse, SecondResponse } from "types/request";
import { request } from "./utils";

export const getPartyOrderByCode = (
  shareLink: string,
  params?: any
): Promise<SecondResponse<OrderResponse>> =>
  request.get(`/party-orders/${shareLink}`, { params }).then((res) => res.data);

const completeOrder = (id: number) => {
  return request
    .put<BaseResponse<any>>(`/order`, {
      id: id,
      status: OrderStatusEnum.FINISHED,
    })
    .then((res) => res.data);
};
const orderApi = {
  getPartyOrderByCode,
  completeOrder,
};

export default orderApi;
