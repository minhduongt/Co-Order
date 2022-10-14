import { request } from "api/utils";
import { useQuery } from "react-query";
import { BaseResponse } from "types/request";
import { TSupplier } from "types/supplier";

type Props = {
  id: number | undefined | null;
};
const getSuppliersOfStore = (id: number) =>
  request
    .get<BaseResponse<TSupplier>>(`/stores/${id}/suppliers`)
    .then((res) => res.data);

const useStoreSuppliers = ({ id }: Props) => {
  const suppliers = useQuery(["stores", id, "suppliers"], () =>
    getSuppliersOfStore(id!)
  );
  return {
    ...suppliers,
    data: suppliers.data?.data,
    metadata: suppliers.data?.metadata,
  };
};

export default useStoreSuppliers;
