import { BackendErrorOptions, Severity } from "../interfaces/Types";

export class BackendError extends Error {
  public isOperational: boolean;
  public showUser: boolean;
  public severity: Severity;
  public code?: number;
  public data?: any;

  constructor(options: BackendErrorOptions) {
    super(options.message);
    this.name = "BackendError";

    this.isOperational = options.isOperational ?? true;
    this.showUser = options.showUser ?? true;
    this.severity = options.severity ?? "error";
    this.code = options.code;
    this.data = options.data;

    Object.setPrototypeOf(this, BackendError.prototype);
  }

  static BadRequest(msg: string) {
    return new BackendError({ message: msg, code: 400, severity: "warning", showUser: true });
  }

  static Unauthorized(msg: string) {
    return new BackendError({ message: msg, code: 401, severity: "warning", showUser: true });
  }

  static Forbidden(msg: string) {
    return new BackendError({ message: msg, code: 403, severity: "warning", showUser: true });
  }

  static NotFound(msg: string) {
    return new BackendError({ message: msg, code: 404, severity: "warning", showUser: true });
  }

  static Conflict(msg: string) {
    return new BackendError({ message: msg, code: 409, severity: "warning", showUser: true });
  }

  static UnprocessableEntity(msg: string) {
    return new BackendError({ message: msg, code: 422, severity: "warning", showUser: true });
  }

  static Internal(msg: string) {
    return new BackendError({ message: msg, code: 500, severity: "critical", showUser: false });
  }

  static ExternalAPI(msg: string, code: number = 502) {
    return new BackendError({ message: msg, code, severity: "warning", showUser: true });
  }

  static ServiceUnavailable(msg: string) {
    return new BackendError({ message: msg, code: 503, severity: "critical", showUser: false });
  }
}
