import authApi from "api/auth";
import { useQuery } from "react-query";
import { TAuth } from "types/auth";
import { ErrorResponse } from "types/response";

const useAuthorize = () => {
  const authorize = async (idToken: string) => {
    const res = await authApi.authorize(idToken);
    return res;
  };

  return {
    authorize,
  };
};
export default useAuthorize;
