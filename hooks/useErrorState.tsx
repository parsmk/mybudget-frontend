import { APIClientError } from "@/api/api-client";
import { useCallback, useState } from "react";

type ErrorState = {
  formErrors: string[];
  fieldErrors: Record<string, string[] | undefined>;
};

const INITIAL: ErrorState = {
  formErrors: [],
  fieldErrors: {},
};

export const useErrorHandler = () => {
  const [state, setState] = useState<ErrorState>(INITIAL);

  const clear = useCallback(() => setState(INITIAL), []);

  const addError = useCallback(
    (m: string) =>
      setState((prev) => ({ ...prev, formErrors: [...prev.formErrors, m] })),
    [],
  );

  const addFieldError = useCallback(
    (key: string, message: string) =>
      setState((prev) => ({
        ...prev,
        fieldErrors: {
          ...prev.fieldErrors,
          [key]: [...(prev.fieldErrors[key] ?? []), message],
        },
      })),
    [],
  );

  const handle = useCallback((error: any) => {
    if (error instanceof APIClientError) {
      const response = error.response;
      setState((prev) => {
        const fieldErrors = { ...prev.fieldErrors };

        if (response.fieldErrors) {
          for (const [field, errs] of Object.entries(response.fieldErrors)) {
            fieldErrors[field] = [
              ...(fieldErrors[field] ?? []),
              ...(errs ?? []),
            ];
          }
        }

        return {
          formErrors: [...prev.formErrors, ...(response.formErrors ?? [])],
          fieldErrors,
        };
      });
    } else if (error instanceof Error) {
      setState((prev) => ({
        ...prev,
        formErrors: [...prev.formErrors, error.message],
      }));
    }
  }, []);

  return { ...state, handler: { clear, addError, addFieldError, handle } };
};
