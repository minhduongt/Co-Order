import orderApi from "api/order";
import { request } from "api/utils";
import { useQuery } from "react-query";

type Props = {
  orderId: number;
  accessToken: string;
};

const useCompleteOrder = ({ orderId, accessToken }: Props) => {
  const orders = useQuery(["order", orderId], () =>
    orderApi.completeOrder(orderId, accessToken)
  );
  return {
    ...orders,
    data: orders.data?.data,
    metadata: orders.data?.metadata,
  };
};

export default useCompleteOrder;
