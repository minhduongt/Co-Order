import { request } from "api/utils";
import { useQuery } from "react-query";
import { TOrder } from "types/order";
import { TProduct } from "types/product";
import { BaseResponse } from "types/request";

type Props = {
    accessToken: string | null;
    params?: any;
};
const getOrderHistories = (accessToken: string, params: any) => {
    const config = {
        headers: {
            authorization: "Bearer " + accessToken,
        },
        params: params,
    };
    return request
        .get<BaseResponse<TOrder>>(`/orders/me`, config
        )
        .then((res) => res.data);

}

const useOrderHistories = ({ accessToken, params }: Props) => {
    const orders = useQuery(["order", accessToken, params], () =>
        getOrderHistories(accessToken!, params)
    );
    return {
        ...orders,
        data: orders.data?.data,
        metadata: orders.data?.metadata,
    };
};

export default useOrderHistories;