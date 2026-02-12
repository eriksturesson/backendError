"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendError = void 0;
class BackendError extends Error {
    constructor(options) {
        var _a, _b, _c;
        super(options.message);
        this.name = "BackendError";
        this.isOperational = (_a = options.isOperational) !== null && _a !== void 0 ? _a : true;
        this.showUser = (_b = options.showUser) !== null && _b !== void 0 ? _b : true;
        this.severity = (_c = options.severity) !== null && _c !== void 0 ? _c : "error";
        this.code = options.code;
        this.data = options.data;
        Object.setPrototypeOf(this, BackendError.prototype);
    }
    // Ordered by HTTP status code (ascending)
    static BadRequest(msg) {
        return new BackendError({ message: msg, code: 400, severity: "warning", showUser: true });
    }
    static Unauthorized(msg) {
        return new BackendError({ message: msg, code: 401, severity: "warning", showUser: true });
    }
    static Forbidden(msg) {
        return new BackendError({ message: msg, code: 403, severity: "warning", showUser: true });
    }
    static NotFound(msg) {
        return new BackendError({ message: msg, code: 404, severity: "warning", showUser: true });
    }
    // 409 Conflict variants
    static Conflict(msg) {
        return new BackendError({ message: msg, code: 409, severity: "warning", showUser: true });
    }
    // 422 Unprocessable / validation
    static UnprocessableEntity(msg) {
        return new BackendError({ message: msg, code: 422, severity: "warning", showUser: true });
    }
    static FailedDependency(msg) {
        return new BackendError({ message: msg, code: 424, severity: "warning", showUser: true });
    }
    // 5xx server errors
    static Internal(msg) {
        return new BackendError({ message: msg, code: 500, severity: "critical", showUser: false });
    }
    static NotImplemented(msg) {
        return new BackendError({ message: msg, code: 501, severity: "error", showUser: true });
    }
    static ExternalAPI(msg, code = 502) {
        return new BackendError({ message: msg, code, severity: "critical", showUser: true });
    }
    static ServiceUnavailable(msg) {
        return new BackendError({ message: msg, code: 503, severity: "critical", showUser: false });
    }
    static GatewayTimeout(msg) {
        return new BackendError({ message: msg, code: 504, severity: "critical", showUser: false });
    }
    static InsufficientStorage(msg) {
        return new BackendError({ message: msg, code: 507, severity: "critical", showUser: false });
    }
}
exports.BackendError = BackendError;
//# sourceMappingURL=BackendError.js.map