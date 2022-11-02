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

  const completePartyOrder = async (orderId: number, accessToken: string) => {
    const res = await partyOrderApi.completePartyOrder(orderId, accessToken);
    return res;
  };
  return {
    completePartyOrder,
    getPartyOrderByCode,
  };
};
export default usePartyOrder;
