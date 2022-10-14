import { beanoiRequest } from "api/utils";
import { useQuery } from "react-query";
import { TCategory } from "types/category";
import { ErrorResponse } from "types/request";

type Props = {
  id?: number | undefined | null;
};

export const getCategoryDetail = (id: any): Promise<TCategory> =>
  beanoiRequest.get(`/categories/${id}`).then((res) => res.data);

const useCategory = ({ id }: Props) => {
  const category = useQuery<TCategory, ErrorResponse>(["categories", id], () =>
    getCategoryDetail(id)
  );

  return {
    ...category,
  };
};

export default useCategory;
