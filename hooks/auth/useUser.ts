import authApi from "api/auth";
import { useQuery } from "react-query";
import { ErrorResponse } from "types/response";
import { TUser } from "types/user";

const useUser = () => {
  const getUserInfo = async (idToken: string) => {
    const res = await authApi.getUserInfo(idToken);
    return res;
  };
  const updateUserInfo = async (idToken: string, userInfo: TUser) => {
    const res = await authApi.updateUserInfo(idToken, userInfo);
    return res;
  };
  return {
    getUserInfo,
    updateUserInfo,
  };
};

export default useUser;
