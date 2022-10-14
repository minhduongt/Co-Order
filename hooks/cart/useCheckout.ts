import cartApi from "api/cart";
import useCartContext from "hooks/useCartContext";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { Cart, CustomerInfo, OrderRequest, SupplierNote } from "types/cart";
import { ErrorResponse } from "types/response";
import { mapCartModelToOrderRequest } from "./helper";

const useCheckout = (currentCart: Cart) => {
  const [errorRes, setErrorRes] = useState<ErrorResponse>();
  const checkOut = useCallback(
    async (
      customer_info: CustomerInfo,
      supplier_notes?: SupplierNote[] | undefined
    ) => {
      try {
        const orderCart = mapCartModelToOrderRequest(currentCart);
        if (!orderCart) throw Error("Không có sản phẩm trong giỏ hàng");
        if (!customer_info) throw Error("Chưa nhập thông tin khách hàng");
        const data: OrderRequest = {
          ...orderCart,
          supplier_notes: supplier_notes,
          customer_info: customer_info,
        };

        const res = await cartApi.checkout(data);
        console.log(res);

        return res.data;
      } catch (error: any) {
        console.log(`checkout error: `, error.response?.data);
        setErrorRes(error.response?.data);
      } finally {
      }
    },
    [currentCart]
  );

  return {
    checkOut,
    errorRes,
  };
};
export default useCheckout;
