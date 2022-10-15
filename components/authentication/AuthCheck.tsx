import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Loading from "./Loading";
import Authenticate from "./index";
import useAuthContext from "hooks/useAuthContext";
import useUserContext from "hooks/useUserContext";
import useRefresh from "hooks/auth/useRefresh";
import { useToast } from "@chakra-ui/react";
import useUser from "hooks/auth/useUser";

function AuthCheck({ children }: any) {
  const router = useRouter();
  const toast = useToast();
  const { user: FbUser, loading } = useAuthContext();
  const {
    user: currentUser,
    SetUser,
    SetAccessToken,
    accessToken,
    refreshToken,
  } = useUserContext();
  const { refresh } = useRefresh();
  const getUserInfo = useUser(accessToken!);
  // console.log("refreshToken from context", refreshToken);
  // console.log("accessToken from context", accessToken);
  // console.log(FbUser);

  useEffect(() => {
    if (getUserInfo) {
      SetUser(getUserInfo.data);
      console.log("userInfo from be", getUserInfo.data);
    }
  }, [getUserInfo]);

  useEffect(() => {
    if (FbUser) {
      console.log("FbUser", FbUser);
    }
  }, [FbUser]);
  // useEffect(() => {
  //   console.log("refreshToken change", refreshToken);
  // }, [refreshToken]);

  useEffect(() => {
    if (FbUser) {
      SetAccessToken(FbUser?.accessToken);
    }
    // const getNewToken = async (idToken: string) => {
    //   const refreshToken = await refresh(idToken);
    // };
    // console.log("accessToken", accessToken);
    if (accessToken) {
      return children;
    } else {
      // if (refreshToken) {
      //   const newRefreshToken = getNewToken(refreshToken);
      //   console.log("newRefreshToken", newRefreshToken);
      //   return children;
      // } else {
      //   toast({
      //     title: "Có lỗi xảy ra!",
      //     status: "error",
      //     position: "top-right",
      //     isClosable: false,
      //     duration: 2000,
      //   });
      // }
      return <Authenticate />;
    }
  }, [accessToken, FbUser]);

  if (accessToken) {
    return children;
  } else if (!accessToken && !loading) {
    return <Authenticate />;
  } else {
    return <Loading />;
  }
}

export default AuthCheck;
