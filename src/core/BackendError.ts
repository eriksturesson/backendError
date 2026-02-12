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

  // Ordered by HTTP status code (ascending)
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

  // 409 Conflict variants
  static Conflict(msg: string) {
    return new BackendError({ message: msg, code: 409, severity: "warning", showUser: true });
  }

  // 422 Unprocessable / validation
  static UnprocessableEntity(msg: string) {
    return new BackendError({ message: msg, code: 422, severity: "warning", showUser: true });
  }

  static FailedDependency(msg: string) {
    return new BackendError({ message: msg, code: 424, severity: "warning", showUser: true });
  }

  // 5xx server errors
  static Internal(msg: string) {
    return new BackendError({ message: msg, code: 500, severity: "critical", showUser: false });
  }

  static NotImplemented(msg: string) {
    return new BackendError({ message: msg, code: 501, severity: "error", showUser: true });
  }

  static ExternalAPI(msg: string, code: number = 502) {
    return new BackendError({ message: msg, code, severity: "critical", showUser: true });
  }

  static ServiceUnavailable(msg: string) {
    return new BackendError({ message: msg, code: 503, severity: "critical", showUser: false });
  }

  static GatewayTimeout(msg: string) {
    return new BackendError({ message: msg, code: 504, severity: "critical", showUser: false });
  }

  static InsufficientStorage(msg: string) {
    return new BackendError({ message: msg, code: 507, severity: "critical", showUser: false });
  }
}
