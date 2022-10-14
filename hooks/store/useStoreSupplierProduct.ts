import { request } from "api/utils";
import { useQuery } from "react-query";
import { TProduct } from "types/product";
import { BaseResponse } from "types/request";
import { TSupplier } from "types/supplier";

type Props = {
  storeId: number | undefined | null;
  supId: number | undefined | null;
  params?: any;
};
const getSupplierProductOfStore = (
  storeId: number,
  supId: number,
  params?: any
) =>
  request
    .get<BaseResponse<TProduct>>(
      `/stores/${storeId}/suppliers/${supId}/products`,
      {
        params,
      }
    )
    .then((res) => res.data);

const useStoreSupplierProduct = ({ storeId, supId, params }: Props) => {
  const supplierProducts = useQuery(
    ["stores", storeId, "suppliers", supId, "products", params],
    () => getSupplierProductOfStore(storeId!, supId!, params)
  );
  return {
    ...supplierProducts,
    data: supplierProducts.data?.data,
    metadata: supplierProducts.data?.metadata,
  };
};

export default useStoreSupplierProduct;
