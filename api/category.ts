import { TCategory } from "types/category.js";
import { BaseResponse } from "types/request.js";
import { request } from "./utils";

export const getCategories = (params: any): Promise<BaseResponse<TCategory>> =>
  request.get("/categories", { params }).then((res) => res.data);

const categoryApi = {
  getCategories,
};

export default categoryApi;
