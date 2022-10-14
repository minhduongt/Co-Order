import cartApi from "api/cart";
import { OrderRequest } from "types/cart";
import { useQuery } from "react-query";

type CartItemPrepare = {
  id: string | number;
  quantity: number;
  price?: number;
};

type CartPriceProps = {
  cartItems: CartItemPrepare[];
  vouchers?: string[];
};

const prepareCart = async (cartPrepare: OrderRequest) => {
  try {
    const res = await cartApi.prepareOrder(cartPrepare);
    return res.data.data;
  } catch (error) {
    throw new Error("Lỗi khi kiểm tra đơn hàng!");
  }
};

const useCartPrice = (cartRequest: OrderRequest | null) => {
  return useQuery(
    ["orders/prepare", cartRequest ?? []],
    () => {
      return prepareCart(cartRequest!);
    },
    {
      enabled:
        Boolean(cartRequest) && Boolean(cartRequest?.products_list?.length),
      retry: 5,
    }
  );
};

export default useCartPrice;
