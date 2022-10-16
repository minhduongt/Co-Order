export type BaseResponse<T> = {
  data: T[];
  metadata: {
    page: number;
    size: number;
    total: number;
  };
};
export type SecondResponse<T> = {
  data: T;
  status: {
    errorCode: number;
    message: string;
    success: boolean;
  };
};

export type PostResponse<T> = {
  data: T;
  code: number;
  message: string;
};

export type TRequestPaging = {
  page?: number;
  size?: number;
};
