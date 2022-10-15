import { request } from "api/utils";
import { useQuery } from "react-query";
import { TProduct } from "types/product";
import { BaseResponse } from "types/request";

type Props = {
    menuId: number | null;
    categoryId: number | null;
    params?: any;
};
const getProductsOfCategory = (menuId: number, categoryId: number, params?: any) =>
    request
        .get<BaseResponse<TProduct>>(`/menus/${menuId}/categories/${categoryId}/products`, {
            params,
        })
        .then((res) => res.data);

const useCategoryProducts = ({ menuId, categoryId, params }: Props) => {
    const products = useQuery(["menu", menuId, categoryId, "products", params], () =>
        getProductsOfCategory(menuId!, categoryId!, params)
    );
    return {
        ...products,
        data: products.data?.data,
        metadata: products.data?.metadata,
    };
};

export default useCategoryProducts;
