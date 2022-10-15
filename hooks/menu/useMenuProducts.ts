import { request } from "api/utils";
import { useQuery } from "react-query";
import { TProduct } from "types/product";
import { BaseResponse } from "types/request";

type Props = {
    menuId: number | null;

    params?: any;
};
const getProductsOfMenu = (menuId: number, params?: any) =>
    request
        .get<BaseResponse<TProduct>>(`/menus/${menuId}/products`, {
            params,
        })
        .then((res) => res.data);

const useMenuProducts = ({ menuId, params }: Props) => {
    const products = useQuery(["menu", menuId, "products", params], () =>
        getProductsOfMenu(menuId!, params)
    );
    return {
        ...products,
        data: products.data?.data,
        metadata: products.data?.metadata,
    };
};

export default useMenuProducts;
