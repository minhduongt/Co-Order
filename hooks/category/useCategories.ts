import categoryApi from "api/category";
import { useQuery } from "react-query";
import { TCategory } from "types/category";

type Props = {
  params?: any;
};

const useCategories = ({ params }: Props = {}) => {
  const categories = useQuery(["categories", params], () =>
    categoryApi.getCategories(params)
  );

  return {
    ...categories,
    data: categories.data?.data,
    metadata: categories.data?.metadata,
  };
};

export default useCategories;
