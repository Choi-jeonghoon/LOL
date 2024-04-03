import { Injectable } from '@nestjs/common';
import { ApiService } from './api.service';

@Injectable()
export class ProcessService {
    constructor(private readonly apiService: ApiService) { }

    async getMatchHistoryExcludeAlphabet(nickname: string) {
        try {
            const userInfo = await this.apiService.getUserInfo(nickname);
            const matchInfo = await this.apiService.getMatchInfo(userInfo.puuid);
            console.log("매칭된 게임의 ID", matchInfo);

            const matchDataPromises = matchInfo.map(async (matchId: string) => {
                const matchData = await this.apiService.getMatchDataInfos(matchId);
                return this.extractMatchData(matchData.data);
            });

            const matchDatas = await Promise.all(matchDataPromises);

            return matchDatas;
        } catch (error) {
            console.error("Error occurred:", error);
            throw error; // 예외 다시 던지기
        }
    }

    extractMatchData(data: { info: { queueId: string; gameDuration: string; gameStartTimestamp: string; gameEndTimestamp: string; participants: any[]; teams: any[]; }; }) {
        /**
         * 초를 시간 문자열 형식으로 변환합니다 (예: "5분 30초").
         * @param {number} seconds - 변환할 초 단위의 숫자입니다.
         * @returns {string} "분 초" 형식으로 포맷된 시간 문자열
         */
        function convertSecondsToTimeString(seconds: number): string {
            const minutes: number = Math.floor(seconds / 60);
            const remainingSeconds: number = Math.round(seconds % 60);
            return `${minutes}분 ${remainingSeconds}초`;
        }

        /**
         * 날짜와 시간 문자열로 변환합니다.
         * @param {number} timestamp - 변환할 타임스탬프입니다.
         * @returns {string} 날짜와 시간 문자열
         */
        function convertTimestampToDate(timestamp: number): string {
            const date: Date = new Date(timestamp);
            return date.toLocaleString(); // 현지 시간 문자열로 변환
        }

        const extractedData = {
            queueId: String(data.info.queueId), // 매칭되어 생성된 게임의 고유 ID
            gameDuration: convertSecondsToTimeString(Number(data.info.gameDuration)), // 총 게임 시간
            gameStartTimestamp: convertTimestampToDate(Number(data.info.gameStartTimestamp)), // 시작 시간
            gameEndTimestamp: convertTimestampToDate(Number(data.info.gameEndTimestamp)), // 종료 시간
            participants: [],
            teams: [],
        };

        console.log("매칭된 게임정보", extractedData);

        // 팀원 정보 (포지션/챔피언/킬/데스/어시/CS 등)
        extractedData.participants = data.info.participants.map(participant => ({
            teamId: participant.teamId, //팀 고유 ID(롤은 두팀으로 나누어 져있다. 100 or 200)
            summonerId: participant.summonerId, //유저의 ID
            summonerName: participant.summonerName, //유저의 닉네임
            summoner1Id: participant.summoner1Id, //유저 주문1
            summoner2Id: participant.summoner2Id, //유저 주문2
            teamPosition: participant.teamPosition === 'UTILITY' ? 'SUPPORT' : participant.teamPosition, //선택된 라인
            championId: participant.championId, //챔피언
            "items": [//사용한 아이템 정보
                participant.item0,
                participant.item1,
                participant.item2,
                participant.item3,
                participant.item4,
                participant.item5,
                participant.item6
            ],
            kills: participant.kills, //킬
            deaths: participant.deaths, //데스
            assists: participant.assists, //어시
            kda: participant.challenges.kda, //킬 데스 어시 평균
            neutralMinionsKilled: participant.neutralMinionsKilled, //정글몹 잡은 수
            totalMinionsKilled: participant.totalMinionsKilled, //미니언 잡은 수(여기에는 대포 미니언도 포함)
        }));
        console.log("매칭된 각 유저들 정보", extractedData.participants);

        // 각 팀 정보
        extractedData.teams = data.info.teams.map(team => ({
            teamId: team.teamId, //팀 고유 ID(롤은 두팀으로 나누어 져있다. 100 or 200)
            firstBlood: team.objectives.champion.first, //어느 팀에서 먼저 첫 번째 킬을 냈는지
            firstTower: team.objectives.tower.first, //어느 팀에서 먼저 첫 타워를 부셨는지
            firstInhibitor: team.objectives.inhibitor.first, //어느팀에서 첫 전령을 잡았는지
            firstBaron: team.objectives.baron.first,// 어느 팀에서 먼저 첫 바론을 잡았는지
            firstDragon: team.objectives.dragon.first, //어느 팀에서 첫 드래곤을 잡았는지
            firstRiftHerald: team.objectives.riftHerald.first, //어느 팀에서 첫 억제기를 부셨는지
            win: team.win, //어느 팀이 이겼는지 
            bans: team.bans.map((ban: { championId: number; }) => ban.championId).filter((championId: number) => championId !== -1), //각팀의 챔피언 금지 선택한 목록
        }));
        console.log("경기 승자 확인 및 벤 정보", extractedData.teams);

        return extractedData;
    }
}
