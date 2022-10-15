import { TMenu, TTimeSlot } from "types/menu";
import { BaseResponse } from "types/request";
import { request } from "./utils";

export const getMenus = (params?: any): Promise<BaseResponse<TMenu>> =>
  request.get("/menus", { params }).then((res) => res.data);

export const getTimeSlots = (
  menuId: number,
  params?: any
): Promise<BaseResponse<TTimeSlot>> =>
  request
    .get(`/menus/${menuId}/time-slots`, { params })
    .then((res) => res.data);
const MenuApi = {
  getMenus,
  getTimeSlots,
};

export default MenuApi;
