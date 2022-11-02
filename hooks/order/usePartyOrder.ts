import orderApi from "api/order";
import partyOrderApi from "api/party_orders";
import { useQuery } from "react-query";

const usePartyOrder = () => {
  const getPartyOrderByCode = async (
    shareLink: string,
    accessToken: string
  ) => {
    const res = await partyOrderApi.getPartyOrderByCode(shareLink, accessToken);
    return res;
  };

  const getPartyOrderDetail = async (orderId: number, accessToken: string) => {
    const res = await partyOrderApi.getPartyOrderDetail(orderId, accessToken);
    return res;
  };

  const getCurrentPartyOrder = async (orderId: number, accessToken: string) => {
    const res = await partyOrderApi.getCurrentPartyOrder(orderId, accessToken);
    return res;
  };

  return {
    getPartyOrderByCode,
    getPartyOrderDetail,
  };
};
export default usePartyOrder;
