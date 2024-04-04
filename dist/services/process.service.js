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
const api_service_1 = require("./api.service");
const utils_1 = require("../utils/utils");
let ProcessService = class ProcessService {
    constructor(apiService) {
        this.apiService = apiService;
    }
    async getMatchHistoryExcludeAlphabet(nickname) {
        try {
            const userInfo = await this.apiService.getUserInfo(nickname);
            const matchInfo = await this.apiService.getMatchInfo(userInfo.puuid);
            const matchDataPromises = matchInfo.map(async (matchId) => {
                const matchDataResponse = await this.apiService.getMatchDataInfos(matchId);
                const matchData = matchDataResponse.data;
                return this.extractMatchData(nickname, matchData);
            });
            const matchDatas = await Promise.all(matchDataPromises);
            return matchDatas;
        }
        catch (error) {
            console.error('Error occurred:', error);
            throw error;
        }
    }
    extractMatchData(nickname, matchData) {
        if (!matchData.metadata) {
            throw new Error('Metadata is missing in match data.');
        }
        const extractedData = {
            nickname,
            matchData: {
                metadata: {
                    dataVersion: matchData.metadata.dataVersion,
                    matchId: matchData.metadata.matchId,
                    participants: matchData.metadata.participants,
                },
                info: {
                    gameCreation: utils_1.default.convertTimestampToDate(Number(matchData.info.gameCreation)),
                    gameEndTimestamp: utils_1.default.convertTimestampToDate(Number(matchData.info.gameEndTimestamp)),
                    gameDuration: utils_1.default.convertSecondsToTimeString(Number(matchData.info.gameDuration)),
                    gameId: matchData.info.gameId,
                    gameMode: matchData.info.gameMode,
                    gameName: matchData.info.gameName,
                    gameStartTimestamp: matchData.info.gameStartTimestamp,
                    gameType: matchData.info.gameType,
                    participants: matchData.info.participants.map((participant) => ({
                        teamId: participant.teamId,
                        puuid: participant.puuid,
                        summonerId: participant.summonerId,
                        summonerLevel: participant.summonerLevel,
                        summonerName: participant.summonerName,
                        championName: participant.championName,
                        championId: participant.championId,
                        lane: participant.lane,
                        teamPosition: participant.teamPosition,
                        goldEarned: participant.goldEarned,
                        assists: participant.assists,
                        deaths: participant.deaths,
                        kills: participant.kills,
                        item0: participant.item0,
                        item1: participant.item1,
                        item2: participant.item2,
                        item3: participant.item3,
                        item4: participant.item4,
                        item5: participant.item5,
                        item6: participant.item6
                    }))
                },
            },
        };
        console.log("가공된 데이터", extractedData);
        return extractedData;
    }
};
exports.ProcessService = ProcessService;
exports.ProcessService = ProcessService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [api_service_1.ApiService])
], ProcessService);
//# sourceMappingURL=process.service.js.map