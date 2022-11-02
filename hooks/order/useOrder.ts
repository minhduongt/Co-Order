import orderApi from "api/order";
import partyOrderApi from "api/party_orders";
import { useQuery } from "react-query";

type Props = {
  shareLink: string;
  params?: any;
};
const useOrder = () => {
  const getOrderDetail = async (orderId: number, accessToken: string) => {
    const res = await orderApi.getOrderDetail(orderId, accessToken);
    return res;
  };

  return {
    getOrderDetail,
  };
};
export default useOrder;
