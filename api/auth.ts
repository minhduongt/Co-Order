import { TAuth } from "types/auth";
import { PostResponse } from "types/request";
import { request } from "./utils";

const authorize = (accessToken: string) => {
  const auth = {
    idToken: accessToken,
  };
  return request.post<PostResponse<TAuth>>(`/oauth2/authorize`, auth);
};
const refresh = (refreshToken: string) => {
  const auth = {
    idToken: refreshToken,
  };
  return request.post<PostResponse<string>>(`/oauth2/token`, auth);
};

const authApi = {
  authorize,
  refresh,
};

export default authApi;
