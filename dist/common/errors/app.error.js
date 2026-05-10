"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(params) {
        var _a, _b, _c;
        super(params === null || params === void 0 ? void 0 : params.message);
        this.name = "AppError";
        this.errorCode = (_a = params === null || params === void 0 ? void 0 : params.errorCode) !== null && _a !== void 0 ? _a : "UNKNOWN";
        this.statusCode = (_b = params === null || params === void 0 ? void 0 : params.statusCode) !== null && _b !== void 0 ? _b : 500;
        this.data = (_c = params === null || params === void 0 ? void 0 : params.data) !== null && _c !== void 0 ? _c : null;
    }
}
exports.AppError = AppError;
