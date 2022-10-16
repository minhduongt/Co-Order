import orderApi from "api/order";
import { useQuery } from "react-query";

type Props = {
  shareLink: string;
  params?: any;
};
const usePartyOrder = () => {
  const getPartyOrderByCode = async (shareLink: string) => {
    const res = await orderApi.getPartyOrderByCode(shareLink);
    return res;
  };
  return {
    getPartyOrderByCode,
  };
};
export default usePartyOrder;
