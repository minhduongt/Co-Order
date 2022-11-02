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
  return {
    getPartyOrderByCode,
  };
};
export default usePartyOrder;
