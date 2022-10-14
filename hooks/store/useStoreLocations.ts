import { request } from "api/utils";
import { useQuery } from "react-query";
import { TLocation } from "types/location";
import { BaseResponse } from "types/request";

type Props = {
  id: number | undefined | null;
};
const getLocationsOfStore = (id: number) =>
  request
    .get<BaseResponse<TLocation>>(`/stores/${id}/locations`)
    .then((res) => res.data);

const useStoreLocations = ({ id }: Props) => {
  const locations = useQuery(["stores", id, "locations"], () =>
    getLocationsOfStore(id!)
  );
  return {
    ...locations,
    data: locations.data?.data,
    metadata: locations.data?.metadata,
  };
};

export default useStoreLocations;
