import { useDisclosure, useToast } from "@chakra-ui/react";
import { Item } from "framer-motion/types/components/Reorder/Item";
import { mapCartModelToOrderRequest } from "hooks/cart/helper";
import useCartPrice from "hooks/cart/useCartPrice";
import { ReactNode, createContext, useState, useEffect } from "react";
import { TArea } from "types/area";
import { Cart } from "types/cart";
import { TRoom } from "types/room";
import { TMenu } from "types/menu";

export type initialStateProps = {
  selectedArea: TArea | null;
  selectedMenu: TMenu | null;
  room: TRoom | null;
  SetSelectedArea: Function;
  SetSelectedMenu: Function;
  SetNewRoom: Function;
  isOpen: boolean;
  onOpen: Function;
  onClose: Function;
};

const initialState: initialStateProps = {
  selectedArea: null,
  selectedMenu: null,
  room: null,
  SetSelectedArea: () => {},
  SetSelectedMenu: () => {},
  SetNewRoom: () => {},
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
};

const AreaContext = createContext(initialState);

type AreaContextProviderProps = {
  children: ReactNode;
};

function AreaContextProvider({ children }: AreaContextProviderProps) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedArea, setSelectedArea] = useState<TArea | null>(
    initialState.selectedArea
  );
  const [selectedMenu, setSelectedMenu] = useState<TMenu | null>(
    initialState.selectedMenu
  );
  const [room, setRoom] = useState<TRoom | null>(initialState.room);
  function SetSelectedArea(newArea: TArea) {
    if (newArea != null) setSelectedArea(newArea);
    else setSelectedArea(null);
  }
  function SetSelectedMenu(newMenu: TMenu) {
    if (newMenu != null) setSelectedMenu(newMenu);
    else setSelectedMenu(null);
  }

  function SetNewRoom(newRoom: TRoom) {
    if (newRoom != null)
      setRoom({
        id: newRoom.id,
        name: newRoom.name,
      });
    else setRoom(null);
  }
  return (
    <AreaContext.Provider
      value={{
        selectedArea,
        selectedMenu,
        room,
        isOpen,
        SetSelectedArea,
        SetSelectedMenu,
        SetNewRoom,
        onClose,
        onOpen,
      }}
    >
      {children}
    </AreaContext.Provider>
  );
}
export { AreaContextProvider, AreaContext };
