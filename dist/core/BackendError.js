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
    static Conflict(msg) {
        return new BackendError({ message: msg, code: 409, severity: "warning", showUser: true });
    }
    static UnprocessableEntity(msg) {
        return new BackendError({ message: msg, code: 422, severity: "warning", showUser: true });
    }
    static Internal(msg) {
        return new BackendError({ message: msg, code: 500, severity: "critical", showUser: false });
    }
    static ExternalAPI(msg, code = 502) {
        return new BackendError({ message: msg, code, severity: "warning", showUser: true });
    }
    static ServiceUnavailable(msg) {
        return new BackendError({ message: msg, code: 503, severity: "critical", showUser: false });
    }
}
exports.BackendError = BackendError;
//# sourceMappingURL=BackendError.js.map