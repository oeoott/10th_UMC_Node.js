"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignUp = void 0;
const error_1 = require("../../../common/errors/error");
const registeredEmails = new Set();
const userSignUp = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (registeredEmails.has(data.email)) {
        throw new error_1.DuplicateUserEmailError("이미 존재하는 이메일입니다.", {
            email: data.email,
        });
    }
    registeredEmails.add(data.email);
    return {
        userId: registeredEmails.size,
        email: data.email,
        name: data.name,
        preferences: ((_a = data.preferences) !== null && _a !== void 0 ? _a : []).map(String),
    };
});
exports.userSignUp = userSignUp;
