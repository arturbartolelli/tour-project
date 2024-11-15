export type ActionError = {
  message: string;
  status: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isActionError(error: any): error is ActionError {
  return (
    typeof error === "object" &&
    error !== null &&
    typeof error.message === "string" &&
    typeof error.status === "number"
  );
}
