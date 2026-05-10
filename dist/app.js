"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = require("./generated/routes");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static("public"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    res.send("Hello World! This is TypeScript Server!");
});
const router = express_1.default.Router();
(0, routes_1.RegisterRoutes)(router);
app.use("/api/v1", router);
app.use((err, req, res, next) => {
    var _a;
    if (res.headersSent) {
        return next(err);
    }
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        resultType: "FAIL",
        error: {
            errorCode: err.errorCode || "UNKNOWN",
            reason: err.message || "알 수 없는 오류가 발생했습니다.",
            data: (_a = err.data) !== null && _a !== void 0 ? _a : null,
        },
        success: null,
    });
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
exports.default = app;
