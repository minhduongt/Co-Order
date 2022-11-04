import { TCustomer } from "types/customer";
import { BaseResponse } from "types/request";
import { request } from "./utils";

export const getCustomer = (params?: any): Promise<BaseResponse<TCustomer>> =>
  request.get("/customers/customerCode", params).then((res) => res.data);

const customerApi = {
  getCustomer,
};

export default customerApi;
