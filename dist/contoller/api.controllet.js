"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainController = void 0;
const common_1 = require("@nestjs/common");
const api_service_1 = require("../services/api.service");
let MainController = class MainController {
    constructor(apiService) {
        this.apiService = apiService;
    }
    async getUserInfo(nickname) {
        try {
            const infoData = await this.apiService.search(nickname);
            console.log("test========================", infoData);
            return infoData;
        }
        catch (error) {
            console.error(error);
            throw new Error('사용자 정보를 가져오는 중에 오류가 발생했습니다.');
        }
    }
};
exports.MainController = MainController;
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)('nickname')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "getUserInfo", null);
exports.MainController = MainController = __decorate([
    (0, common_1.Controller)('/'),
    __metadata("design:paramtypes", [api_service_1.ApiService])
], MainController);
//# sourceMappingURL=api.controllet.js.map