export type CreateObjectResponse<T> = {
  errors: { count: number; reasons: string[] };
  success: { count: number; uploaded: T[] };
};

export type ErrorResponse = {
  formErrors?: string[];
  fieldErrors?: Record<string, string[] | undefined>;
};
