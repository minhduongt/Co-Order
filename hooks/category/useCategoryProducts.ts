import { request } from "api/utils";
import { useQuery } from "react-query";
import { TProduct, TProductInMenu } from "types/product";
import { BaseResponse } from "types/request";

type Props = {
  menuId: number | null;
  categoryId: number | null;
  params?: any;
};
const getProductsOfCategory = (
  menuId: number,
  categoryId: number,
  params?: any
) =>
  request
    .get<BaseResponse<TProductInMenu>>(
      `/menus/${menuId}/categories/${categoryId}/products`,
      {
        params,
      }
    )
    .then((res) => res.data);
const getProductsOfMenu = (menuId: number, params?: any) =>
  request
    .get<BaseResponse<TProductInMenu>>(`/menus/${menuId}/products`, {
      params,
    })
    .then((res) => res.data);

const useCategoryProducts = ({ menuId, categoryId, params }: Props) => {
  const products = useQuery(
    ["menu", menuId, "category", categoryId, "products", params],
    () => {
      if (categoryId == null) {
        return getProductsOfMenu(menuId!, params);
      } else {
        return getProductsOfCategory(menuId!, categoryId!, params);
      }
    }
  );
  return {
    ...products,
    data: products.data?.data,
    metadata: products.data?.metadata,
  };
};

export default useCategoryProducts;
