import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
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
  const [idtoken, setIdToken] = useState(null);
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
  const { getUserInfo } = useUser();
  const authorizeUser = async () => {
    const res = await authorize(await FbUser.getIdToken()!);
    if (res.status === 200) {
      const accessToken = res.data?.data?.accessToken;
      const refreshToken = res.data?.data?.refreshToken;
      SetAccessToken(accessToken);
      SetRefreshToken(refreshToken);
    }
  };
  const getUserInfoByAccessToken = async () => {
    const userInfo = await getUserInfo(accessToken!);
    SetUser(userInfo);
    console.log("userInfo from be", userInfo);
  };

  // console.log(FbUser);
  // useEffect(() => {
  //   if (FbUser) {
  //     console.log("FbUser", FbUser);
  //   }
  // }, [FbUser]);
  useEffect(() => {
    if (accessToken) {
      getUserInfoByAccessToken();
    }
  }, [accessToken]);

  useEffect(() => {
    if (!currentUser && FbUser && !accessToken) {
      authorizeUser();
    }
  }, [currentUser, accessToken, FbUser]);

  useEffect(() => {
    if (FbUser) {
      return children;
    } else {
      return <Authenticate />;
    }
  }, [FbUser]);

  if (FbUser) {
    return children;
  } else if (!FbUser && !loading) {
    router.push("/authentication");
  } else {
    return <Loading />;
  }
}

export default AuthCheck;
