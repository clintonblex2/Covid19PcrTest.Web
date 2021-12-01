export class ApiResponse<T> {
  message: string;
  result: T;
  totalCount: number;
}

export class PaginatedResult<T> {
  totalCount: number;
  currentPage: number;
  totalPages: number;
  data: T;
}
