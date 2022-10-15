import { useDisclosure, useToast } from "@chakra-ui/react";
import { Item } from "framer-motion/types/components/Reorder/Item";
import { mapCartModelToOrderRequest } from "hooks/cart/helper";
import useCartPrice from "hooks/cart/useCartPrice";
import { ReactNode, createContext, useState, useEffect } from "react";
import { Cart } from "types/cart";
import { TRoom } from "types/room";
import { TUser } from "types/user";

export type initialStateProps = {
  user: TUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  SetUser: Function;
  SetAccessToken: Function;
  SetRefreshToken: Function;
};

const initialState: initialStateProps = {
  user: null,
  accessToken: null,
  refreshToken: null,
  SetUser: () => {},
  SetAccessToken: () => {},
  SetRefreshToken: () => {},
};

const UserContext = createContext(initialState);

type UserContextProviderProps = {
  children: ReactNode;
};

function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<TUser | null>(initialState.user);
  const [accessToken, setAccessToken] = useState<string | null>(
    initialState.accessToken
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    initialState.refreshToken
  );

  function SetUser(user: TUser) {
    if (user != null) setUser(user);
    else setAccessToken(null);
  }
  function SetAccessToken(accessToken: string) {
    if (accessToken != null) setAccessToken(accessToken);
    else setAccessToken(null);
  }
  function SetRefreshToken(refreshToken: string) {
    if (refreshToken != null) setRefreshToken(refreshToken);
    else setRefreshToken(null);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        SetUser,
        SetAccessToken,
        SetRefreshToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
export { UserContextProvider, UserContext };
