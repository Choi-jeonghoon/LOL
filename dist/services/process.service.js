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
let ProcessService = class ProcessService {
    constructor(apiService) {
        this.apiService = apiService;
    }
    async getMatchHistoryExcludeAlphabet(nickname) {
        try {
            const userInfo = await this.apiService.getUserInfo(nickname);
            const matchInfo = await this.apiService.getMatchInfo(userInfo.puuid);
            console.log('매칭된 게임의 ID', matchInfo);
            const matchDataPromises = matchInfo.map(async (matchId) => {
                const matchData = await this.apiService.getMatchDataInfos(matchId);
                return this.extractMatchData(matchData.data);
            });
            const matchDatas = await Promise.all(matchDataPromises);
            return matchDatas;
        }
        catch (error) {
            console.error('Error occurred:', error);
            throw error;
        }
    }
    extractMatchData(data) {
        function convertSecondsToTimeString(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = Math.round(seconds % 60);
            return `${minutes}분 ${remainingSeconds}초`;
        }
        function convertTimestampToDate(timestamp) {
            const date = new Date(timestamp);
            return date.toLocaleString();
        }
        const extractedData = {
            queueId: String(data.info.queueId),
            gameDuration: convertSecondsToTimeString(Number(data.info.gameDuration)),
            gameStartTimestamp: convertTimestampToDate(Number(data.info.gameStartTimestamp)),
            gameEndTimestamp: convertTimestampToDate(Number(data.info.gameEndTimestamp)),
            participants: [],
            teams: [],
        };
        console.log('매칭된 게임정보', extractedData);
        extractedData.participants = data.info.participants.map((participant) => ({
            teamId: participant.teamId,
            summonerId: participant.summonerId,
            summonerName: participant.summonerName,
            summoner1Id: participant.summoner1Id,
            summoner2Id: participant.summoner2Id,
            teamPosition: participant.teamPosition === 'UTILITY'
                ? 'SUPPORT'
                : participant.teamPosition,
            championId: participant.championId,
            items: [
                participant.item0,
                participant.item1,
                participant.item2,
                participant.item3,
                participant.item4,
                participant.item5,
                participant.item6,
            ],
            kills: participant.kills,
            deaths: participant.deaths,
            assists: participant.assists,
            kda: participant.challenges.kda,
            neutralMinionsKilled: participant.neutralMinionsKilled,
            totalMinionsKilled: participant.totalMinionsKilled,
        }));
        console.log('매칭된 각 유저들 정보', extractedData.participants);
        extractedData.teams = data.info.teams.map((team) => ({
            teamId: team.teamId,
            firstBlood: team.objectives.champion.first,
            firstTower: team.objectives.tower.first,
            firstInhibitor: team.objectives.inhibitor.first,
            firstBaron: team.objectives.baron.first,
            firstDragon: team.objectives.dragon.first,
            firstRiftHerald: team.objectives.riftHerald.first,
            win: team.win,
            bans: team.bans
                .map((ban) => ban.championId)
                .filter((championId) => championId !== -1),
        }));
        console.log('경기 승자 확인 및 벤 정보', extractedData.teams);
        return extractedData;
    }
};
exports.ProcessService = ProcessService;
exports.ProcessService = ProcessService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [api_service_1.ApiService])
], ProcessService);
//# sourceMappingURL=process.service.js.map