import orderApi from "api/order";
import { useQuery } from "react-query";

type Props = {
  shareLink: string;
  params?: any;
};
const usePartyOrder = () => {
  const getPartyOrderByCode = async (
    shareLink: string,
    accessToken: string
  ) => {
    const res = await orderApi.getPartyOrderByCode(shareLink, accessToken);
    return res;
  };
  return {
    getPartyOrderByCode,
  };
};
export default usePartyOrder;
