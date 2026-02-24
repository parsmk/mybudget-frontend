import { ErrorResponse } from "@/api/responses";
import { useCallback, useState } from "react";

export const useBulkAPIErrorHandler = () => {
  const [itemErrors, setItemErrors] = useState<Record<string, ErrorResponse>>(
    {},
  );
  const [generalErrors, setGeneralErrors] = useState<string[]>([]);
  const [commonErrors, setCommonErrs] = useState<Set<string>>(new Set());

  const clearAll = useCallback(() => {
    setItemErrors({});
    setGeneralErrors([]);
    setCommonErrs(new Set());
  }, []);
  const clearGeneralErrors = useCallback(() => setGeneralErrors([]), []);
  const clearItemErrors = useCallback(() => setItemErrors({}), []);
  const clearCommonErrors = useCallback(() => setCommonErrs(new Set()), []);

  const addGeneralError = useCallback((m: string | string[]) => {
    const messages = Array.isArray(m) ? m : [m];
    setCommonErrs((prev) => new Set([...prev, ...messages]));
    setGeneralErrors((prev) => [...prev, ...(Array.isArray(m) ? m : [m])]);
  }, []);

  const addIndexedFormError = useCallback((i: string, m: string | string[]) => {
    const messages = Array.isArray(m) ? m : [m];
    setCommonErrs((prev) => new Set([...prev, ...messages]));
    setItemErrors((prev) => {
      const existingItem = prev[i];
      return {
        ...prev,
        [i]: {
          ...existingItem,
          formErrors: [...(existingItem?.formErrors ?? []), ...messages],
        },
      };
    });
  }, []);

  const addIndexedFieldError = useCallback(
    (i: string, k: string, m: string[] | string) => {
      const messages = Array.isArray(m) ? m : [m];
      setCommonErrs((prev) => new Set([...prev, ...messages]));
      setItemErrors((prev) => {
        const existingItem = prev[i];

        return {
          ...prev,
          [i]: {
            ...existingItem,
            fieldErrors: {
              ...(existingItem?.fieldErrors ?? {}), // Spread fieldErrors if they exist else create
              [k]: [...(existingItem?.fieldErrors?.[k] ?? []), ...messages], // Spread existing keys errors else create
            },
          },
        };
      });
    },
    [],
  );

  const handle = useCallback(
    (inputErrs: { index: string; errors: ErrorResponse }[]) => {
      for (const error of inputErrs) {
        if (error.errors.fieldErrors) {
          for (const [k, err] of Object.entries(error.errors.fieldErrors)) {
            if (err) addIndexedFieldError(error.index, k, err);
          }
        }

        if (error.errors.formErrors) {
          addIndexedFormError(error.index, error.errors.formErrors);
        }
      }
    },
    [addIndexedFieldError, addGeneralError],
  );

  return {
    itemErrors,
    generalErrors,
    commonErrors: Array.from(commonErrors),
    handler: {
      clearAll,
      clearGeneralErrors,
      clearItemErrors,
      clearCommonErrors,
      addGeneralError,
      addIndexedFormError,
      addIndexedFieldError,
      handle,
    },
  };
};
