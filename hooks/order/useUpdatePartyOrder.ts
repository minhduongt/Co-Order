import orderApi from "api/order";
import partyOrderApi from "api/party_orders";
import { request } from "api/utils";
import { useQuery } from "react-query";
import { OrderStatusEnum } from "types/constant";
import { TOrder } from "types/order";
import { TProduct } from "types/product";
import { BaseResponse } from "types/request";

type Props = {
  orderId: number;
  accessToken: string;
};

const useCompletePartyOrder = ({ orderId, accessToken }: Props) => {
  const orders = useQuery(["order", orderId], () =>
    partyOrderApi.completePartyOrder(orderId, accessToken)
  );
  return {
    ...orders,
  };
};

export default useCompletePartyOrder;
