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

    const { info: { gameCreation, gameEndTimestamp, gameDuration, gameId, gameMode,
      gameName, gameStartTimestamp, gameType, platformId, queueId, participants, teams } } = matchData;

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
          participants: participants.map(({ teamId, puuid, summonerId, summonerLevel,
            summonerName, championName, championId, lane, teamPosition, goldEarned, assists,
            deaths, kills, challenges, item0, item1, item2, item3, item4, item5, item6 }) => ({
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
