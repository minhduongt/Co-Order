import { TArea } from "types/area";
import { BaseResponse } from "types/request";
import { request } from "./utils";

export const getAreas = (params?: any): Promise<BaseResponse<TArea>> =>
  request.get("/areas", { params }).then((res) => res.data);

const areaApi = {
  getAreas,
};

export default areaApi;
