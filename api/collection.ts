import { TCollection } from "types/collection";
import { BaseResponse } from "types/request";
import { beanoiRequest } from "./utils";

export const getCollections = (
  params?: any
): Promise<BaseResponse<TCollection>> =>
  beanoiRequest.get("/collections", { params }).then((res) => res.data);

const collectionApi = {
  getCollections,
};

export default collectionApi;
