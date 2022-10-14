import { BaseResponse } from "types/request";
import { TStore } from "types/store";
import { request } from "./utils";

export const getStores = (params?: any): Promise<BaseResponse<TStore>> =>
  request.get("/stores", { params }).then((res) => res.data);

const storeApi = {
  getStores,
};

export default storeApi;
