import { useDisclosure, useToast } from "@chakra-ui/react";
import { Item } from "framer-motion/types/components/Reorder/Item";
import { mapCartModelToOrderRequest } from "hooks/cart/helper";
import useCartPrice from "hooks/cart/useCartPrice";
import { ReactNode, createContext, useState, useEffect } from "react";
import { Cart, OrderResponse } from "types/cart";
import { TRoom } from "types/room";

export type initialStateProps = {
  cart: Cart;
  isHost: boolean;
  partyOrder: OrderResponse | null;
  SetNewCart: Function;
  SetPartyOrder: Function;
  SetIsHost: Function;
  isOpen: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
};

const initialState: initialStateProps = {
  cart: {
    items: [],
    totalItem: 0,
    total: 0,
  },
  isHost: false,
  partyOrder: null,
  SetNewCart: () => {},
  SetIsHost: () => {},
  SetPartyOrder: () => {},
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
};

const CartContext = createContext(initialState);

type CartContextProviderProps = {
  children: ReactNode;
};

function CartContextProvider({ children }: CartContextProviderProps) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cart, setCart] = useState<Cart>(initialState.cart);
  const [isHost, setIsHost] = useState<boolean>(initialState.isHost);
  const [partyOrder, setPartyOrder] = useState<OrderResponse | null>(
    initialState.partyOrder
  );

  function SetPartyOrder(newPartyOrder: OrderResponse) {
    if (newPartyOrder != null) setPartyOrder(newPartyOrder);
    else setPartyOrder(null);
  }
  function SetIsHost(isHost: boolean) {
    if (isHost) {
      setIsHost(isHost);
    } else setIsHost(false);
  }

  function SetNewCart(newCart: Cart) {
    if (newCart != null)
      setCart({
        items: newCart.items,
        total:
          newCart.items.length > 0
            ? newCart.items.reduce((total, item) => total + item.total, 0)
            : 0,
        totalItem: newCart.items?.length,
      });
    else
      setCart({
        items: [],
        total: 0,
        totalItem: 0,
      });
  }

  return (
    <CartContext.Provider
      value={{
        isHost,
        cart,
        partyOrder,
        isOpen,
        SetNewCart,
        SetIsHost,
        SetPartyOrder,
        onClose,
        onOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export { CartContextProvider, CartContext };
