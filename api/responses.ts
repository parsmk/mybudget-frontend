export type BulkResponse<T> = {
  errors: {
    count: number;
    items: { index: string; errors: ErrorResponse }[];
  };
  success: { count: number; items: T[] };
};

export type ErrorResponse = {
  formErrors?: string[];
  fieldErrors?: Record<string, string[] | undefined>;
};
