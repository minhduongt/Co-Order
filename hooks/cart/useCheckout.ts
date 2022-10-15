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
    async (supplier_notes?: SupplierNote[] | undefined) => {
      try {
        const orderCart = mapCartModelToOrderRequest(currentCart);
        if (!orderCart) throw Error("Không có sản phẩm trong giỏ hàng");
        const data: OrderRequest = {
          notes: "",
          endTime: "",
          locationId: 1,
          menuId: 1,
          timeSlotId: 1,
          paymentMethod: "cash",
          productInMenus: orderCart.productInMenus,
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
