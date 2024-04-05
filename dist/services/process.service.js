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
            const matchDataPromises = await Promise.all(matchInfo.map(async (matchId) => {
                const { data: matchData } = await this.apiService.getMatchDataInfos(matchId);
                return this.extractMatchData(nickname, matchData);
            }));
            return matchDataPromises;
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
        const { info: { gameCreation, gameEndTimestamp, gameDuration, gameId, gameMode, gameName, gameStartTimestamp, gameType, platformId, queueId, participants, teams } } = matchData;
        const mappedTeams = teams.map(({ teamId, win, bans, objectives }) => ({
            teamId,
            win,
            bans: bans.map(({ championId, pickTurn }) => ({ championId, pickTurn })),
            objectives: {
                baron: { ...objectives.baron },
                champion: { ...objectives.champion },
                dragon: { ...objectives.dragon },
            },
        }));
        return {
            nickname,
            matchData: {
                metadata: { ...matchData.metadata },
                info: {
                    gameCreation: utils_1.default.convertTimestampToDate(Number(gameCreation)),
                    gameEndTimestamp: utils_1.default.convertTimestampToDate(Number(gameEndTimestamp)),
                    gameDuration: utils_1.default.convertSecondsToTimeString(Number(gameDuration)),
                    gameId,
                    gameMode,
                    gameName,
                    gameStartTimestamp,
                    gameType,
                    platformId,
                    queueId,
                    participants: participants.map(({ teamId, puuid, summonerId, summonerLevel, summonerName, championName, championId, lane, teamPosition, goldEarned, assists, deaths, kills, challenges, item0, item1, item2, item3, item4, item5, item6 }) => ({
                        teamId,
                        puuid,
                        summonerId,
                        summonerLevel,
                        summonerName,
                        championName,
                        championId,
                        lane,
                        teamPosition,
                        goldEarned,
                        assists,
                        deaths,
                        kills,
                        kda: challenges.kda,
                        item0,
                        item1,
                        item2,
                        item3,
                        item4,
                        item5,
                        item6,
                    })),
                    teams: mappedTeams,
                },
            },
        };
    }
};
exports.ProcessService = ProcessService;
exports.ProcessService = ProcessService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [api_service_1.ApiService])
], ProcessService);
//# sourceMappingURL=process.service.js.map