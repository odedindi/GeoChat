"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.PrismaUserRepository = void 0;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var logger_1 = require("../config/logger");
var prisma_config_1 = require("../config/prisma.config");
var userMap_1 = require("../utils/Mappers/userMap");
var PrismaUserRepository = /** @class */ (function () {
    function PrismaUserRepository() {
        var _this = this;
        this.userMap = new userMap_1["default"]();
        this.handleError = function (cb, errMsg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, cb["catch"](function (e) {
                        logger_1["default"].error("".concat(errMsg, ": ").concat(e));
                        throw e;
                    })];
            });
        }); };
        this.addUser = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var errMsg, prismaUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        errMsg = 'Prisma User Repository addUser error';
                        return [4 /*yield*/, this.handleError(prisma_config_1["default"].user.create({ data: data }), errMsg)];
                    case 1:
                        prismaUser = _a.sent();
                        return [2 /*return*/, this.userMap.toDTO(prismaUser)];
                }
            });
        }); };
        this.updateUser = function (_a) {
            var data = _a.data, where = _a.where;
            return __awaiter(_this, void 0, void 0, function () {
                var errMsg, prismaUser;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            errMsg = 'Prisma User Repository updateUser error';
                            return [4 /*yield*/, this.handleError(prisma_config_1["default"].user.update({ data: data, where: where }), errMsg)];
                        case 1:
                            prismaUser = _b.sent();
                            return [2 /*return*/, this.userMap.toDTO(prismaUser)];
                    }
                });
            });
        };
        this.removeUser = function (where) { return __awaiter(_this, void 0, void 0, function () {
            var errMsg, prismaUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        errMsg = 'Prisma User Repository removeUser error';
                        return [4 /*yield*/, this.handleError(prisma_config_1["default"].user["delete"]({ where: where }), errMsg)];
                    case 1:
                        prismaUser = _a.sent();
                        return [2 /*return*/, this.userMap.toDTO(prismaUser)];
                }
            });
        }); };
        this.getAllUsers = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var errMsg, prismaUsers, users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        errMsg = 'Prisma User Repository getAllUsers error';
                        return [4 /*yield*/, this.handleError(prisma_config_1["default"].user.findMany(__assign({}, params)), errMsg)];
                    case 1:
                        prismaUsers = _a.sent();
                        users = this.userMap.toDTOArr(prismaUsers);
                        logger_1["default"].info("getAllUsers, number of users found: ".concat(users.length, " "));
                        return [2 /*return*/, users];
                }
            });
        }); };
        this.getUser = function (userWhereUniqueInput) { return __awaiter(_this, void 0, void 0, function () {
            var errMsg, prismaUser, matchUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        errMsg = 'Prisma User Repository getUser error';
                        return [4 /*yield*/, this.handleError(prisma_config_1["default"].user.findUnique({ where: userWhereUniqueInput }), errMsg)];
                    case 1:
                        prismaUser = _a.sent();
                        if (prismaUser) {
                            matchUser = this.userMap.toDTO(prismaUser);
                            return [2 /*return*/, [matchUser]];
                        }
                        return [2 /*return*/, []];
                }
            });
        }); };
        this.getUsersWithinRange = function (lat, lng, radius) { return __awaiter(_this, void 0, void 0, function () {
            var errMsg, query, prismaUsers, users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        errMsg = 'Prisma User Repository find usersWithinRange error:';
                        query = client_1.Prisma.sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\t\t\tSELECT\n\t\t\t\t*\n\t\t\tFROM\n\t\t\t\t\"User\"\n\t\t\tWHERE\n\t\t\t\tST_DWithin(ST_MakePoint(geolocation_lat,geolocation_lng), ST_MakePoint(", ", ", ")::geography, ", " * 1000)\n\t\t"], ["\n\t\t\tSELECT\n\t\t\t\t*\n\t\t\tFROM\n\t\t\t\t\"User\"\n\t\t\tWHERE\n\t\t\t\tST_DWithin(ST_MakePoint(geolocation_lat,geolocation_lng), ST_MakePoint(", ", ", ")::geography, ", " * 1000)\n\t\t"])), lat, lng, radius);
                        return [4 /*yield*/, this.handleError(prisma_config_1["default"].$queryRaw(query), errMsg)];
                    case 1:
                        prismaUsers = _a.sent();
                        users = this.userMap.toDTOArr(prismaUsers);
                        logger_1["default"].info("getUsersWithinRange: number of users found: ".concat(users.length));
                        return [2 /*return*/, users];
                }
            });
        }); };
    }
    PrismaUserRepository = __decorate([
        (0, common_1.Injectable)()
    ], PrismaUserRepository);
    return PrismaUserRepository;
}());
exports.PrismaUserRepository = PrismaUserRepository;
var templateObject_1;
