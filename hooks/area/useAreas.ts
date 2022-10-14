import areaApi from "api/area";
import { useQuery } from "react-query";

type Props = {
  params?: any;
};

const useAreas = ({ params }: Props = {}) => {
  const areas = useQuery(["areas", params], () => areaApi.getAreas(params));

  return {
    ...areas,
    data: areas.data?.data,
    metadata: areas.data?.metadata,
  };
};

export default useAreas;
