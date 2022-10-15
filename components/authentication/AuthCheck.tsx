import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Loading from "./Loading";
import Authenticate from "./index";
import useAuthContext from "hooks/useAuthContext";
import useUserContext from "hooks/useUserContext";
import useRefresh from "hooks/auth/useRefresh";
import { useToast } from "@chakra-ui/react";
import useUser from "hooks/auth/useUser";
import useAuthorize from "hooks/auth/useAuth";

function AuthCheck({ children }: any) {
  const router = useRouter();
  const toast = useToast();
  const { authorize } = useAuthorize();
  const { user: FbUser, loading } = useAuthContext();
  const {
    user: currentUser,
    SetUser,
    SetAccessToken,
    accessToken,
    refreshToken,
    SetRefreshToken,
  } = useUserContext();
  const { refresh } = useRefresh();
  const getUserInfo = useUser(accessToken!);
  const authorizeUser = async () => {
    const res = await authorize(await FbUser.getIdToken()!);
    if (res.status === 200) {
      const accessToken = res.data?.data?.accessToken;
      const refreshToken = res.data?.data?.refreshToken;
      SetAccessToken(accessToken);
      SetRefreshToken(refreshToken);
    }
  };
  // console.log(FbUser);
  // useEffect(() => {
  //   if (currentUser) {
  //     console.log("currentUser", currentUser);
  //   }
  // }, [currentUser]);
  useEffect(() => {
    if (accessToken) {
      SetUser(getUserInfo.data);
      console.log("userInfo from be", getUserInfo.data);
    }
  }, [accessToken]);

  useEffect(() => {
    if (!currentUser && FbUser && !accessToken) {
      authorizeUser();
    }
  }, [currentUser, accessToken, FbUser]);

  useEffect(() => {
    const currentPath = router.pathname;

    // const getNewToken = async (idToken: string) => {
    //   const refreshToken = await refresh(idToken);
    // };
    // console.log("accessToken", accessToken);
    if (FbUser) {
      // if (currentPath.includes("authentication")) {
      //   router.push("/");
      // }
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
