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
var generators_1 = require("../src/utils/generators");
var client_1 = require("@prisma/client");
var logger_1 = require("../src/config/logger");
var seed = function (usersList) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        logger_1["default"].info("===> \uD83C\uDF31Seeding start\uD83C\uDF31 <===");
        usersList.forEach(function (user) { return __awaiter(void 0, void 0, void 0, function () {
            var prismaUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.user.create({ data: user })];
                    case 1:
                        prismaUser = _a.sent();
                        logger_1["default"].info("User: ".concat(prismaUser.id, " successfully created"));
                        return [2 /*return*/];
                }
            });
        }); });
        logger_1["default"].info('===> 🌱Seeding end🌱 <===');
        return [2 /*return*/];
    });
}); };
var users = [
    {
        username: 'Bret',
        avatar: generators_1.generate.avatar(),
        socketID: generators_1.generate.id(),
        preferedDistance: 40,
        userID: 'fe51k85',
        room: 'public',
        geolocation_lat: 46.811232,
        geolocation_lng: 8.323341,
        Message: {
            create: [
                {
                    messageID: generators_1.generate.id(),
                    content: 'Yinaal haolam ani bainternet!',
                    createdat: '1637250393738',
                    geolocation_lat: 46.811232,
                    geolocation_lng: 8.323341
                },
                {
                    messageID: generators_1.generate.id(),
                    content: 'ignore my last message please! :D',
                    createdat: '1637250393938',
                    geolocation_lat: 46.811232,
                    geolocation_lng: 8.323341
                },
            ]
        }
    },
    {
        username: 'Antonette',
        avatar: generators_1.generate.avatar(),
        socketID: generators_1.generate.id(),
        preferedDistance: 40,
        userID: 'fe5dk15',
        room: 'public',
        geolocation_lat: 47.012344,
        geolocation_lng: 8.911111,
        Message: {
            create: [
                {
                    messageID: generators_1.generate.id(),
                    content: '@Bret, is it all good?',
                    createdat: '1637250494938',
                    geolocation_lat: 47.012344,
                    geolocation_lng: 8.911111
                },
            ]
        }
    },
    {
        username: 'Samantha',
        avatar: generators_1.generate.avatar(),
        socketID: generators_1.generate.id(),
        preferedDistance: 40,
        userID: 'fe51k2q',
        room: 'public',
        geolocation_lat: 50.023311,
        geolocation_lng: 9.000221,
        Message: {
            create: [
                {
                    messageID: generators_1.generate.id(),
                    content: 'check out where i am!',
                    createdat: '1637250393938',
                    geolocation_lat: 47.3792555,
                    geolocation_lng: 8.5412411
                },
            ]
        }
    },
    {
        username: 'Karianne',
        avatar: generators_1.generate.avatar(),
        socketID: generators_1.generate.id(),
        preferedDistance: 40,
        userID: 'vew1281',
        room: 'public',
        geolocation_lat: 47.001132,
        geolocation_lng: 8.012311
    },
    {
        username: 'Kamren',
        avatar: generators_1.generate.avatar(),
        socketID: generators_1.generate.id(),
        preferedDistance: 40,
        userID: 'aed1k11',
        room: 'public',
        geolocation_lat: 45.988821,
        geolocation_lng: 7.123312
    },
    {
        username: 'Leopoldo_Corkery',
        avatar: generators_1.generate.avatar(),
        socketID: generators_1.generate.id(),
        preferedDistance: 40,
        userID: '12s1ka5',
        room: 'public',
        geolocation_lat: 44.123121,
        geolocation_lng: 7.071232
    },
    {
        username: 'Elwyn.Skiles',
        avatar: generators_1.generate.avatar(),
        socketID: generators_1.generate.id(),
        preferedDistance: 40,
        userID: 're5bsa5',
        room: 'public',
        geolocation_lat: 48.290304,
        geolocation_lng: 7.064123
    },
    {
        username: 'Maxime_Nienow',
        avatar: generators_1.generate.avatar(),
        socketID: generators_1.generate.id(),
        preferedDistance: 40,
        userID: 'ee51185',
        room: 'public',
        geolocation_lat: 47.444211,
        geolocation_lng: 9.522122
    },
    {
        username: 'Delphine',
        avatar: generators_1.generate.avatar(),
        socketID: generators_1.generate.id(),
        preferedDistance: 40,
        userID: 'fx52kk5',
        room: 'public',
        geolocation_lat: 46.123132,
        geolocation_lng: 9.412121
    },
    {
        username: 'Moriah.Stanton',
        avatar: generators_1.generate.avatar(),
        socketID: generators_1.generate.id(),
        preferedDistance: 40,
        userID: '1ee1k25',
        room: 'public',
        geolocation_lat: 48.123211,
        geolocation_lng: 8.290404
    },
];
var prisma = new client_1.PrismaClient();
seed(users)["catch"](function (err) {
    logger_1["default"].error(err);
    process.exit(1);
})["finally"](function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, prisma.$disconnect()];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); });
