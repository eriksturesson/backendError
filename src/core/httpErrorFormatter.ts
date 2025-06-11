import { BackendError } from "./BackendError";

function isValidStatusCode(code: unknown): code is number {
  return typeof code === "number" && Number.isInteger(code) && code >= 100 && code <= 599;
}

export async function httpErrorFormatter({
  err,
}: {
  err: unknown;
}): Promise<{ status: number; body: Record<string, any>; showUser: boolean; message: string }> {
  // Handle your custom BackendError type
  if (err instanceof BackendError) {
    const status = isValidStatusCode(err.code) ? err.code : 400;

    // If developer explicitly set showUser, trust that; otherwise default: true for 4xx, false for 5xx
    const showUser = typeof err.showUser === "boolean" ? err.showUser : status < 500;

    const message = err.message || "Error";

    // If showUser is true, return detailed info including data, code, severity; else generic message
    const body = showUser
      ? {
          message,
          ...(err.data !== undefined && { data: err.data }),
          code: status,
          severity: err.severity,
        }
      : { message: "Internal Server Error" };

    return { status, body, showUser, message };
  }

  // Handle generic Error or string or unknown
  let status = 500;
  let message = "Internal Server Error";
  let showUser = false;

  if (err instanceof Error) {
    message = err.message;

    // Try to extract HTTP status code from common fields 'status' or 'code'
    const maybeStatus = (err as any).status || (err as any).code;
    if (isValidStatusCode(maybeStatus)) {
      status = maybeStatus;
      showUser = status < 500; // show message for 4xx errors by default
    }
  } else if (typeof err === "string") {
    message = err;
    status = 400;
    showUser = true;
  }

  const body = showUser ? { message } : { message: "Internal Server Error" };

  return { status, body, showUser, message };
}
