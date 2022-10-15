import authApi from "api/auth";
import { useQuery } from "react-query";
import { ErrorResponse } from "types/response";
import { TUser } from "types/user";

const useUser = (idToken: string) => {
  const getUserInfo = useQuery<TUser, ErrorResponse>(["users"], () =>
    authApi.getUserInfo(idToken)
  );

  return {
    ...getUserInfo,
    data: getUserInfo.data,
  };
};

export default useUser;
