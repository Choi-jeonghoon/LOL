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
const process_service_1 = require("./process.service");
let ApiService = class ApiService {
    constructor(httpService, processService) {
        this.httpService = httpService;
        this.processService = processService;
        this.riotIdApiUrl = process.env.RIOT_ID_URL;
        this.riotMatchUrl = process.env.RIOT_MATCH_URL;
        this.riotApiKey = process.env.RIOT_API_KEY;
    }
    async search(nickname) {
        const apiUrl = `${this.riotIdApiUrl}${nickname}`;
        const apiKey = this.riotApiKey;
        try {
            const infoData = await this.httpService
                .get(apiUrl, { headers: { 'X-Riot-Token': apiKey } })
                .toPromise();
            console.log("service", infoData.data);
            const processedData = await this.processService.infoProcess(infoData.data);
            console.log("가공되서온 ID 값", processedData.id);
            console.log("가공되서온 puuid 값", processedData.puuid);
            const matchIdUrl = `${this.riotMatchUrl.replace('{puuid}', processedData.puuid)}&start=0&count=20`;
            console.log("매치 ID를 가져오는 URL", matchIdUrl);
            const matchIdResponse = await this.httpService
                .get(matchIdUrl, { headers: { 'X-Riot-Token': apiKey } })
                .toPromise();
            return matchIdResponse.data;
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
    __metadata("design:paramtypes", [axios_1.HttpService,
        process_service_1.ProcessService])
], ApiService);
//# sourceMappingURL=api.service.js.map