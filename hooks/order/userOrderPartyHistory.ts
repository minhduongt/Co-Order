import { request } from "api/utils";
import { useQuery } from "react-query";
import { TOrder } from "types/order";
import { TProduct } from "types/product";
import { BaseResponse } from "types/request";

type Props = {
    accessToken: string | null;
    params?: any;
};
const getOrderPartyHistories = (accessToken: string, params: any) => {
    const config = {
        headers: {
            authorization: "Bearer " + accessToken,
        },
        params: params,
    };
    return request
        .get<BaseResponse<TOrder>>(`/party-orders/me`, config
        )
        .then((res) => res.data);

}

const useOrderPartyHistories = ({ accessToken, params }: Props) => {
    const orders = useQuery(["order", accessToken, params], () =>
        getOrderPartyHistories(accessToken!, params)
    );
    return {
        ...orders,
        data: orders.data?.data,
        metadata: orders.data?.metadata,
    };
};

export default useOrderPartyHistories;