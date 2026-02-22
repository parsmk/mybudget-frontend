export type CreateObjectResponse<T> = {
  errors: { count: number; reasons: string[] };
  success: { count: number; uploaded: T[] };
};

export type ErrorResponse = {
  error?: string;
  formErrors?: string[];
  fieldErrors?: object[];
};
