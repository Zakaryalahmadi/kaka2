export enum Status {
  Success = "success",
  Error = "error",
}

export type SuccessResponse<T> = {
  status: Status.Success;
  result: T;
};

export type ErrorResponse = {
  status: Status.Error;
  message: string;
  errorCode: string;
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
