import partyOrderApi from "api/party_orders";
import { request } from "api/utils";
import { useQuery } from "react-query";
import { TCategory } from "types/category";
import { TPartyOrderDetail } from "types/order";
import { ErrorResponse } from "types/response";

const usePartyOrderDetail = (orderId: number, accessToken: string) => {
  const category = useQuery<TPartyOrderDetail>(
    ["party-orders", orderId, "detail"],
    () => partyOrderApi.getPartyOrderDetail(orderId, accessToken)
  );

  return {
    ...category,
  };
};

export default usePartyOrderDetail;
