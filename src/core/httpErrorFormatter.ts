import { BackendError } from "./BackendError";

export async function httpErrorFormatter({ err }: { err: unknown }): Promise<{ status: number; body: string }> {
  if (err instanceof BackendError && err.showUser) {
    const parsedCode = Number(err.code);
    const status = Number.isInteger(parsedCode) ? parsedCode : 400;

    return {
      status,
      body: JSON.stringify(err),
    };
  }

  const message = err instanceof Error ? err.message : typeof err === "string" ? err : "Internal Server Error";

  return {
    status: 500,
    body: JSON.stringify({ message }),
  };
}
