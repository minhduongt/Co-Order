import { request } from "api/utils";
import { useQuery } from "react-query";
import { OrderStatusEnum } from "types/constant";
import { TOrder } from "types/order";
import { TProduct } from "types/product";
import { BaseResponse } from "types/request";

type Props = {
    orderId: number | null;
    params?: any;
};
const completeOrder = (id: number, params: any) => {
    const config = {
        params: params,
        body: {
            id: id,
            status: OrderStatusEnum.FINISHED,
        },
    };
    return request
        .put<BaseResponse<TOrder>>(`/order/me`, config
        )
        .then((res) => res.data);

}

const useCompleteOrder = ({ orderId, params }: Props) => {
    const orders = useQuery(["order", orderId, params], () =>
        completeOrder(orderId!, params)
    );
    return {
        ...orders,
        data: orders.data?.data,
        metadata: orders.data?.metadata,
    };
};

export default useCompleteOrder;