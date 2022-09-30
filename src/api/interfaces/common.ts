export interface ErrorObject {
  key: string;
  message: string;
  validation: string;
}

export interface SuccessMutationResult<T> {
  success: true;
  errors: ErrorObject[];
  data: T;
}

export interface ErrorMutationResult {
  success: false;
  errors: ErrorObject[];
  data: null;
}

export type MutationResult<T> = SuccessMutationResult<T> | ErrorMutationResult;

export interface StandardPaginationParams {
  page?: number;
  pageSize?: number;
  q?: string;
}

export interface PageInfo {
  totalPages: number;
  totalEntries: number;
  pageSize: number;
  page: number;
}

export interface PaginationPage<T> {
  data: T[];
  pageInfo: PageInfo;
}
