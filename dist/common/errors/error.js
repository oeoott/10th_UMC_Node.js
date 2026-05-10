"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateUserEmailError = void 0;
const app_error_1 = require("./app.error");
class DuplicateUserEmailError extends app_error_1.AppError {
    constructor(message, data) {
        super({
            errorCode: "U001",
            statusCode: 409,
            message,
            data,
        });
    }
}
exports.DuplicateUserEmailError = DuplicateUserEmailError;
