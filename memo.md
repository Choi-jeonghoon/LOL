// memo.md

interface 파일 수정할때

participants 안에 있는 게임에 참여한 유저의 암호와 ID array
뽑을려면 아래껄로
export interface MatchDataType {
    matchId: string;
    dataVersion: string;
    info: InfoDataType;
}
또한 데이터를 추출하는 곳에서도 관련해서 뎁스바꿔줘야된다
.
process.services..ts 파일에서 데이터 조작하는부분에서 바꿔줘야된다.

private extractMatchData(
    nickname: string,
    matchData: MatchDataType,
  ): DataType {
    if (!matchData) {
      throw new Error('Metadata is missing in match data.');
    }
    const extractedData: DataType = {
      nickname,
      matchData: {
        matchId: matchData.matchId,
        dataVersion: matchData.dataVersion,
        info: {
          gameCreation: Utils.convertTimestampToDate(
            Number(matchData.info.gameCreation),
          ),
          gameEndTimestamp: Utils.convertTimestampToDate(
            Number(matchData.info.gameEndTimestamp),
          ),
          gameDuration: Utils.convertSecondsToTimeString(
            Number(matchData.info.gameDuration),
          ),
          gameId: matchData.info.gameId,
          gameMode: matchData.info.gameMode,
          gameName: matchData.info.gameName,
          gameStartTimestamp: matchData.info.gameStartTimestamp,
          gameType: matchData.info.gameType,
          participants: matchData.info.participants.map(
            (participant: ParticipantType) => ({
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
              item6: participant.item6,
              kda: participant.challenges.kda,
            }),
          ),
        },
      },
    };







    ////////////////////////process.service.ts 코드를 구조분해할당으로 작업한 경우
    import { Injectable } from '@nestjs/common';
import { ApiService } from './api.service';
import { DataType, MatchDataType, ParticipantType, TeamType, BanType } from '../types/interface';
import Utils from '../utils/utils';

@Injectable()
export class ProcessService {
  constructor(private readonly apiService: ApiService) { }

  async getMatchHistoryExcludeAlphabet(nickname: string): Promise<DataType[]> {
    try {
      const userInfo = await this.apiService.getUserInfo(nickname);
      const matchInfo = await this.apiService.getMatchInfo(userInfo.puuid);

      const matchDataPromises = await Promise.all(matchInfo.map(async (matchId: string) => {
        const { data: matchData } = await this.apiService.getMatchDataInfos(matchId);
        return this.extractMatchData(nickname, matchData);
      }));

      return matchDataPromises;
    } catch (error) {
      console.error('Error occurred:', error);
      throw error;
    }
  }

  private extractMatchData(
    nickname: string,
    matchData: MatchDataType,
  ): DataType {
    if (!matchData.metadata) {
      throw new Error('Metadata is missing in match data.');
    }

    const { gameCreation, gameEndTimestamp, gameDuration, gameId, gameMode, gameName, gameStartTimestamp, gameType, platformId, queueId, teams } = matchData.info;

    const participants = matchData.info.participants.map(({ teamId, puuid, summonerId, summonerLevel, summonerName, championName, championId, lane, teamPosition, goldEarned, assists, deaths, kills, challenges, item0, item1, item2, item3, item4, item5, item6 }) => ({
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
    }));
    const mappedTeams = teams.map(({ teamId, win, bans, objectives }) => ({
      teamId,
      win,
      bans: bans.map(({ championId, pickTurn }) => ({ championId, pickTurn })),
      objectives: {
        baron: {
          first: objectives.baron.first,
          kills: objectives.baron.kills,
        },
        champion: {
          first: objectives.champion.first,
          kills: objectives.champion.kills,
        },
        dragon: {
          first: objectives.champion.first,
          kills: objectives.champion.kills,
        },
      },
    }));


    const extractedData: DataType = {
      nickname,
      matchData: {
        metadata: {
          matchId: matchData.metadata.matchId,
          dataVersion: matchData.metadata.dataVersion,
          participants: matchData.metadata.participants,
        },
        info: {
          gameCreation: Utils.convertTimestampToDate(Number(gameCreation)),
          gameEndTimestamp: Utils.convertTimestampToDate(Number(gameEndTimestamp)),
          gameDuration: Utils.convertSecondsToTimeString(Number(gameDuration)),
          gameId,
          gameMode,
          gameName,
          gameStartTimestamp,
          gameType,
          platformId,
          queueId,
          participants,
          teams: mappedTeams,
        },
      },
    };


    return extractedData;
  }
}



//////////////////람다 함수 + 객채분해(구조분해)를 이용한경우
import { Injectable } from '@nestjs/common';
import { ApiService } from './api.service';
import { DataType, MatchDataType } from '../types/interface';
import Utils from '../utils/utils';

@Injectable()
export class ProcessService {
  constructor(private readonly apiService: ApiService) { }

  async getMatchHistoryExcludeAlphabet(nickname: string): Promise<DataType[]> {
    try {
      const userInfo = await this.apiService.getUserInfo(nickname);
      const matchInfo = await this.apiService.getMatchInfo(userInfo.puuid);

      const matchDataPromises = await Promise.all(matchInfo.map(async (matchId: string) => {
        const { data: matchData } = await this.apiService.getMatchDataInfos(matchId);
        return this.extractMatchData(nickname, matchData);
      }));

      return matchDataPromises;
    } catch (error) {
      console.error('Error occurred:', error);
      throw error;
    }
  }

  private extractMatchData(nickname: string, matchData: MatchDataType): DataType {
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
          gameCreation: Utils.convertTimestampToDate(Number(gameCreation)),
          gameEndTimestamp: Utils.convertTimestampToDate(Number(gameEndTimestamp)),
          gameDuration: Utils.convertSecondsToTimeString(Number(gameDuration)),
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
}
