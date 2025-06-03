"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendError = void 0;
var BackendError = /** @class */ (function (_super) {
    __extends(BackendError, _super);
    function BackendError(options) {
        var _this = this;
        var _a, _b, _c;
        _this = _super.call(this, options.message) || this;
        _this.name = "BackendError";
        _this.isOperational = (_a = options.isOperational) !== null && _a !== void 0 ? _a : true;
        _this.showUser = (_b = options.showUser) !== null && _b !== void 0 ? _b : true;
        _this.severity = (_c = options.severity) !== null && _c !== void 0 ? _c : "error";
        _this.code = options.code;
        _this.data = options.data;
        Object.setPrototypeOf(_this, BackendError.prototype);
        return _this;
    }
    BackendError.BadRequest = function (msg) {
        return new BackendError({ message: msg, code: 400, severity: "warning", showUser: true });
    };
    BackendError.Unauthorized = function (msg) {
        return new BackendError({ message: msg, code: 401, severity: "warning", showUser: true });
    };
    BackendError.Forbidden = function (msg) {
        return new BackendError({ message: msg, code: 403, severity: "warning", showUser: true });
    };
    BackendError.NotFound = function (msg) {
        return new BackendError({ message: msg, code: 404, severity: "warning", showUser: true });
    };
    BackendError.Conflict = function (msg) {
        return new BackendError({ message: msg, code: 409, severity: "warning", showUser: true });
    };
    BackendError.UnprocessableEntity = function (msg) {
        return new BackendError({ message: msg, code: 422, severity: "warning", showUser: true });
    };
    BackendError.Internal = function (msg) {
        return new BackendError({ message: msg, code: 500, severity: "critical", showUser: false });
    };
    BackendError.ServiceUnavailable = function (msg) {
        return new BackendError({ message: msg, code: 503, severity: "critical", showUser: false });
    };
    return BackendError;
}(Error));
exports.BackendError = BackendError;
