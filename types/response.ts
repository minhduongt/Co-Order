export type BaseReponse<T> = {
  data: T[];
  metadata: {
    page: number;
    size: number;
    total: number;
  };
};

export type ErrorResponse = {
  message: string;
  error: {
    code: number;
    message: string;
  };
};
