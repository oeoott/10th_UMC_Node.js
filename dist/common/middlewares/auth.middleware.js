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
exports.authorizeUser = authorizeUser;
function authorizeUser() {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const { username } = req.cookies;
        if (username) {
            console.log(`[인증 성공] ${username}님, 환영합니다.`);
            next();
        }
        else {
            console.log("[인증 실패] 로그인이 필요합니다.");
            res
                .status(401)
                .send('<script>alert("로그인이 필요합니다!");location.href="/api/v1/users/login";</script>');
        }
    });
}
