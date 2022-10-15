import authApi from "api/auth";

const useRefresh = () => {
  const refresh = async (idToken: string) => {
    const res = await authApi.refresh(idToken);
    return res;
  };

  return {
    refresh,
  };
};
export default useRefresh;
