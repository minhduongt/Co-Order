import { TAuth } from "types/auth";
import { PostResponse } from "types/request";
import { BaseReponse } from "types/response";
import { TUser } from "types/user";
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

const getUserInfo = (accessToken: string) => {
  const config = {
    headers: {
      authorization: "Bearer " + accessToken,
    },
  };
  return request.get<TUser>("/users/me", config).then((res) => res.data);
};

const updateUserInfo = (accessToken: string, userInfo: TUser) => {
  const config = {
    headers: {
      authorization: "Bearer " + accessToken,
    },
  };
  return request.put<PostResponse<TAuth>>(`/users/me`, userInfo, config);
};

const authApi = {
  authorize,
  refresh,
  getUserInfo,
  updateUserInfo,
};

export default authApi;
