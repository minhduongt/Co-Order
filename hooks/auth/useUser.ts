import authApi from "api/auth";
import { useQuery } from "react-query";
import { ErrorResponse } from "types/response";
import { TUser } from "types/user";

const useUser = () => {
  const getUserInfo = async (idToken: string) => {
    const res = await authApi.getUserInfo(idToken);
    return res;
  };
  return {
    getUserInfo,
  };
};

export default useUser;
