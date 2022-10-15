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
      timeSlotId: string,
      menuId: number,
      locationId: number,
      accessToken: string
    ) => {
      try {
        const orderCart = mapCartModelToOrderRequest(
          currentCart,
          timeSlotId,
          menuId,
          locationId
        );
        if (!orderCart) throw Error("Không có sản phẩm trong giỏ hàng");
        console.log("orderCart", orderCart);

        const res = await cartApi.checkout(orderCart, accessToken);
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
