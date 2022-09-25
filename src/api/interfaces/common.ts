export interface ErrorObject {
  key: string;
  message: string;
}

export interface SuccessMutationResult<T> {
  success: true;
  data: T;
}

export interface ErrorMutationResult {
  success: false;
  errors: ErrorObject[];
  data: null;
}

export type MutationResult<T> = SuccessMutationResult<T> | ErrorMutationResult;
