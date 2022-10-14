import storeApi from "api/store";
import { useQuery } from "react-query";

type Props = {
  params?: any;
};

const useStores = ({ params }: Props = {}) => {
  const stores = useQuery(["stores", params], () => storeApi.getStores(params));

  return {
    ...stores,
    data: stores.data?.data,
    metadata: stores.data?.metadata,
  };
};

export default useStores;
