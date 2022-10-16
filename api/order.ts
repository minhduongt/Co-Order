import { OrderStatusEnum } from "types/constant";
import { BaseResponse } from "types/request";
import { request } from "./utils";

const completeOrder = (id: number) => {
    return request
        .put<BaseResponse<any>>(`/order`, {
            id: id,
            status: OrderStatusEnum.FINISHED,
        },
        )
        .then((res) => res.data);

}
const orderApi = {
    completeOrder,
};

export default orderApi;