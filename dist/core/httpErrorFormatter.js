"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpErrorFormatter = void 0;
var BackendError_1 = require("./BackendError");
function isValidStatusCode(code) {
    return typeof code === "number" && Number.isInteger(code) && code >= 100 && code <= 599;
}
function httpErrorFormatter(err) {
    // Handle your custom BackendError type
    if (err instanceof BackendError_1.BackendError) {
        var status_1 = isValidStatusCode(err.code) ? err.code : 400;
        // If developer explicitly set showUser, trust that; otherwise default: true for 4xx, false for 5xx
        var showUser_1 = typeof err.showUser === "boolean" ? err.showUser : status_1 < 500;
        var message_1 = err.message || "Error";
        // If showUser is true, return detailed info including data, code, severity; else generic message
        var body_1 = showUser_1
            ? __assign(__assign({ message: message_1 }, (err.data !== undefined && { data: err.data })), { code: status_1, severity: err.severity }) : { message: "Internal Server Error" };
        return { status: status_1, body: body_1, showUser: showUser_1, message: message_1 };
    }
    // Handle generic Error or string or unknown
    var status = 500;
    var message = "Internal Server Error";
    var showUser = false;
    if (err instanceof Error) {
        message = err.message;
        // Try to extract HTTP status code from common fields 'status' or 'code'
        var maybeStatus = err.status || err.code;
        if (isValidStatusCode(maybeStatus)) {
            status = maybeStatus;
            showUser = status < 500; // show message for 4xx errors by default
        }
    }
    else if (typeof err === "string") {
        message = err;
        status = 400;
        showUser = true;
    }
    var body = showUser ? { message: message } : { message: "Internal Server Error" };
    return { status: status, body: body, showUser: showUser, message: message };
}
exports.httpErrorFormatter = httpErrorFormatter;
