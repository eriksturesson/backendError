export type Severity = "info" | "warning" | "error" | "critical";
export interface BackendErrorOptions {
    message: string;
    isOperational?: boolean;
    showUser?: boolean;
    severity?: Severity;
    code?: number;
    data?: any;
}
