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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const dotenv = require("dotenv");
let ApiService = class ApiService {
    constructor(httpService) {
        this.httpService = httpService;
        dotenv.config();
        this.riotApiUrl = process.env.RIOT_ID_URL;
        this.riotApiKey = process.env.RIOT_API_KEY;
    }
    async search(nickname) {
        const apiUrl = `${this.riotApiUrl}${nickname}`;
        const apiKey = this.riotApiKey;
        try {
            const response = await this.httpService
                .get(apiUrl, { headers: { 'X-Riot-Token': apiKey } })
                .toPromise();
            return response.data;
        }
        catch (error) {
            throw new Error('API 호출 중 오류가 발생했습니다.');
        }
    }
    async beError() {
        throw new Error('에러임');
    }
};
exports.ApiService = ApiService;
exports.ApiService = ApiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], ApiService);
//# sourceMappingURL=api.service.js.map