import { beanoiRequest } from "api/utils";
import { useQuery } from "react-query";
import { TProduct } from "types/product";
import { BaseResponse } from "types/request";

type Props = {
  storeId: number | undefined | null;
  params?: any;
};
const getSupplierProductOfStore = (storeId: number, params?: any) =>
  beanoiRequest
    .get<BaseResponse<TProduct>>(`/stores/${storeId}/products`, {
      params,
    })
    .then((res) => res.data);

const useStoreProducts = ({ storeId, params }: Props) => {
  const storeProducts = useQuery(["stores", storeId, "products", params], () =>
    getSupplierProductOfStore(storeId!, params)
  );
  return {
    ...storeProducts,
    data: storeProducts.data?.data,
    metadata: storeProducts.data?.metadata,
  };
};

export default useStoreProducts;
