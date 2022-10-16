import { TArea } from "types/area";
import { OrderResponse } from "types/cart";
import { BaseResponse, SecondResponse } from "types/request";
import { request } from "./utils";

export const getPartyOrderByCode = (
  shareLink: string,
  params?: any
): Promise<SecondResponse<OrderResponse>> =>
  request.get(`/party-orders/${shareLink}`, { params }).then((res) => res.data);

const orderApi = {
  getPartyOrderByCode,
};

export default orderApi;
