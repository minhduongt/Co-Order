import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Loading from "./Loading";
import Authenticate from "./index";
import useAuthContext from "hooks/useAuthContext";
import useUserContext from "hooks/useUserContext";
import useRefresh from "hooks/auth/useRefresh";
import { useToast } from "@chakra-ui/react";

function AuthCheck({ children }: any) {
  const router = useRouter();
  const toast = useToast();
  const { user: FbUser, loading } = useAuthContext();
  const { user: currentUser, accessToken, refreshToken } = useUserContext();
  const { refresh } = useRefresh();
  console.log("refreshToken", refreshToken);
  console.log("accessToken", accessToken);
  // console.log(FbUser);
  useEffect(() => {
    console.log("refreshToken", refreshToken);
  }, [refreshToken]);

  useEffect(() => {
    // const getNewToken = async (idToken: string) => {
    //   const refreshToken = await refresh(idToken);
    // };
    // console.log("accessToken", accessToken);
    if (FbUser) {
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
  }, [FbUser]);

  if (FbUser) {
    return children;
  } else if (!FbUser && !loading) {
    return <Authenticate />;
  } else {
    return <Loading />;
  }
}

export default AuthCheck;
