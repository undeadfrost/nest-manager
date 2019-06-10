export enum EHttpStatus {
  Error = 'error',
  Success = 'success',
}

export type TMessage = string;
export type TExceptionOption = TMessage | {
  message: TMessage;
  error?: any
};
