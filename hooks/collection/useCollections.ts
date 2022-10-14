import collectionApi from "api/collection";
import { useQuery } from "react-query";

type Props = {
  params?: any;
};

const useCollections = ({ params }: Props = {}) => {
  const collections = useQuery(["collections", params], () =>
    collectionApi.getCollections(params)
  );

  return {
    ...collections,
    data: collections.data?.data,
    metadata: collections.data?.metadata,
  };
};

export default useCollections;
