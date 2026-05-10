"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UserController = void 0;
const tsoa_1 = require("tsoa");
const user_service_1 = require("../services/user.service");
const response_1 = require("../../../common/responses/response");
const error_1 = require("../../../common/errors/error");
const auth_middleware_1 = require("../../../common/middlewares/auth.middleware");
let UserController = class UserController extends tsoa_1.Controller {
    handleUserSignUp(body) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("회원가입을 요청했습니다!");
            console.log("body:", body);
            const user = yield (0, user_service_1.userSignUp)(body);
            return (0, response_1.success)(user);
        });
    }
    handleGuestPage() {
        return __awaiter(this, void 0, void 0, function* () {
            return `
      <h1>게스트 페이지</h1>
      <p>이 페이지는 로그인이 필요 없습니다.</p>
      <ul>
        <li><a href="/api/v1/users/mypage">마이페이지 (로그인 필요)</a></li>
      </ul>
    `;
        });
    }
    handleLoginPage() {
        return __awaiter(this, void 0, void 0, function* () {
            return "<h1>로그인 페이지</h1><p>로그인이 필요한 페이지에서 튕겨나오면 여기로 옵니다.</p>";
        });
    }
    handleMypage(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return `
      <h1>마이페이지</h1>
      <p>환영합니다, ${req.cookies.username}님!</p>
      <p>이 페이지는 로그인한 사람만 볼 수 있습니다.</p>
    `;
        });
    }
    handleSetLogin(req) {
        return __awaiter(this, void 0, void 0, function* () {
            req.res.cookie("username", "UMC10th", { maxAge: 3600000 });
            return '로그인 쿠키(username=UMC10th) 생성 완료! <a href="/api/v1/users/mypage">마이페이지로 이동</a>';
        });
    }
    handleSetLogout(req) {
        return __awaiter(this, void 0, void 0, function* () {
            req.res.clearCookie("username");
            return '로그아웃 완료 (쿠키 삭제). <a href="/api/v1/users/guest">메인으로</a>';
        });
    }
    handleDuplicateEmailTest() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new error_1.DuplicateUserEmailError("이미 존재하는 이메일입니다.", {
                email: "test@example.com",
            });
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, tsoa_1.Post)("signup"),
    __param(0, (0, tsoa_1.Body)())
], UserController.prototype, "handleUserSignUp", null);
__decorate([
    (0, tsoa_1.Get)("guest")
], UserController.prototype, "handleGuestPage", null);
__decorate([
    (0, tsoa_1.Get)("login")
], UserController.prototype, "handleLoginPage", null);
__decorate([
    (0, tsoa_1.Get)("mypage"),
    (0, tsoa_1.Middlewares)((0, auth_middleware_1.authorizeUser)()),
    __param(0, (0, tsoa_1.Request)())
], UserController.prototype, "handleMypage", null);
__decorate([
    (0, tsoa_1.Get)("set-login"),
    __param(0, (0, tsoa_1.Request)())
], UserController.prototype, "handleSetLogin", null);
__decorate([
    (0, tsoa_1.Get)("set-logout"),
    __param(0, (0, tsoa_1.Request)())
], UserController.prototype, "handleSetLogout", null);
__decorate([
    (0, tsoa_1.Get)("duplicate-email-test")
], UserController.prototype, "handleDuplicateEmailTest", null);
exports.UserController = UserController = __decorate([
    (0, tsoa_1.Route)("users"),
    (0, tsoa_1.Tags)("Users")
], UserController);
