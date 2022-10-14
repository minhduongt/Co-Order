import { TMenu } from "types/menu";
import { BaseResponse } from "types/request";
import { request } from "./utils";

export const getMenus = (params?: any): Promise<BaseResponse<TMenu>> =>
  request.get("/menus", { params }).then((res) => res.data);

const MenuApi = {
  getMenus,
};

export default MenuApi;
