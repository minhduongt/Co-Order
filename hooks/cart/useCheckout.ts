import cartApi from "api/cart";
import useCartContext from "hooks/useCartContext";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import {
  Cart,
  CartItem,
  CustomerInfo,
  OrderRequest,
  ProductInMenuItem,
  SupplierNote,
} from "types/cart";
import { ErrorResponse } from "types/response";
import { mapCartItemToProduct, mapCartModelToOrderRequest } from "./helper";

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

  const createPartyOrder = useCallback(
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

        const res = await cartApi.partyOrder(orderCart, accessToken);
        console.log(res);

        return res.data;
      } catch (error: any) {
        console.log(`create partyOrder error: `, error.response?.data);
        setErrorRes(error.response?.data);
      } finally {
      }
    },
    [currentCart]
  );

  const joinPartyOrder = useCallback(
    async (partyOrderId: number, shareLink: string, accessToken: string) => {
      try {
        let productInMenus: ProductInMenuItem[] = [];
        currentCart.items.forEach((cartItem: CartItem) => {
          productInMenus.push(...mapCartItemToProduct(cartItem));
        });

        if (productInMenus) {
          const res = await cartApi.joinParty(
            partyOrderId,
            productInMenus,
            shareLink,
            accessToken
          );
          console.log(res);

          return res.data;
        }
      } catch (error: any) {
        console.log(`join partyOrder error: `, error.response?.data);
        setErrorRes(error.response?.data);
      } finally {
      }
    },
    [currentCart]
  );

  const completePartyOrder = async (partyOrderId: number, idToken: string) => {
    const res = await cartApi.completeOrder(partyOrderId, idToken);
    return res;
  };

  return {
    checkOut,
    createPartyOrder,
    joinPartyOrder,
    errorRes,
    completePartyOrder,
  };
};
export default useCheckout;
