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
exports.ProcessService = void 0;
const common_1 = require("@nestjs/common");
let ProcessService = class ProcessService {
    constructor() { }
    async infoProcess(infoData) {
        console.log("값 확인", infoData);
        try {
            const processedData = this.processData(infoData);
            return processedData;
        }
        catch (error) {
            console.error('데이터 가공 중 에러가 발생했습니다:', error);
            throw new Error('데이터 가공 중 에러가 발생했습니다.');
        }
    }
    processData(infoData) {
        const processedData = {
            id: infoData.id,
            puuid: infoData.puuid
        };
        console.log("가공된 데이터", processedData);
        return processedData;
    }
};
exports.ProcessService = ProcessService;
exports.ProcessService = ProcessService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ProcessService);
//# sourceMappingURL=process.service.js.map