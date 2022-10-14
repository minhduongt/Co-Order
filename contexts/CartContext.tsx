import { useDisclosure, useToast } from "@chakra-ui/react";
import { Item } from "framer-motion/types/components/Reorder/Item";
import { mapCartModelToOrderRequest } from "hooks/cart/helper";
import useCartPrice from "hooks/cart/useCartPrice";
import { ReactNode, createContext, useState, useEffect } from "react";
import { Cart } from "types/cart";
import { TRoom } from "types/room";

export type initialStateProps = {
  cart: Cart;
  room: TRoom | null;
  SetNewCart: Function;
  SetNewRoom: Function;
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
  room: null,
  SetNewCart: () => {},
  SetNewRoom: () => {},
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
  const [room, setRoom] = useState<TRoom | null>(initialState.room);

  function SetNewRoom(newRoom: TRoom) {
    if (newRoom != null)
      setRoom({
        id: newRoom.id,
        name: newRoom.name,
      });
    else setRoom(null);
  }
  function SetNewCart(newCart: Cart) {
    if (newCart != null)
      setCart({
        items: newCart.items,
        total: 0,
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
        cart,
        room,
        isOpen,
        SetNewCart,
        SetNewRoom,
        onClose,
        onOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export { CartContextProvider, CartContext };
