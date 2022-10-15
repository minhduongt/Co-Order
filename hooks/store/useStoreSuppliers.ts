import { request } from "api/utils";
import { useQuery } from "react-query";
import { BaseResponse } from "types/request";
import { TSupplier } from "types/supplier";

type Props = {
  areaId: number | null;

};
const getSuppliersOfArea = (id: number) =>
  request
    .get<BaseResponse<TSupplier>>(`suppliers`,
      {
        params: {
          areaId: id,
          isActive: true,
        }

      })
    .then((res) => res.data);

const useAreaSuppliers = ({ areaId }: Props) => {
  const suppliers = useQuery(["stores", areaId, "suppliers"], () =>
    getSuppliersOfArea(areaId!)
  );
  return {
    ...suppliers,
    data: suppliers.data?.data,
    metadata: suppliers.data?.metadata,
  };
};

export default useAreaSuppliers;
