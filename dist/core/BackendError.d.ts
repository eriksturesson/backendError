import { BackendErrorOptions, Severity } from "../interfaces/Types";
export declare class BackendError extends Error {
    isOperational: boolean;
    showUser: boolean;
    severity: Severity;
    code?: number;
    data?: any;
    constructor(options: BackendErrorOptions);
    static BadRequest(msg: string): BackendError;
    static Unauthorized(msg: string): BackendError;
    static Forbidden(msg: string): BackendError;
    static NotFound(msg: string): BackendError;
    static Conflict(msg: string): BackendError;
    static UnprocessableEntity(msg: string): BackendError;
    static Internal(msg: string): BackendError;
    static ServiceUnavailable(msg: string): BackendError;
}
