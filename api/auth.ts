import { Auth } from "types/auth";
import { PostResponse } from "types/request";
import { request } from "./utils";

const authorize = (accessToken: string) => {
  const auth = {
    idToken: accessToken,
  };
  return request.post<PostResponse<string>>(`/oauth2/authorize`, auth);
};

const authApi = {
  authorize,
};

export default authApi;
