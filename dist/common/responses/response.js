"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.success = void 0;
const success = (data) => ({
    resultType: "SUCCESS",
    error: null,
    success: data,
});
exports.success = success;
