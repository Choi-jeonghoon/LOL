import { Injectable } from '@nestjs/common';
import { ApiService } from './api.service';
import { DataType, MatchDataType, ParticipantType } from '../types/interface';
import Utils from '../utils/utils';

@Injectable()
export class ProcessService {
  constructor(private readonly apiService: ApiService) { }

  async getMatchHistoryExcludeAlphabet(nickname: string): Promise<DataType[]> {
    try {
      const userInfo = await this.apiService.getUserInfo(nickname);
      const matchInfo = await this.apiService.getMatchInfo(userInfo.puuid);
      //console.log('큐 잡힌 방 matchId', matchInfo);

      const matchDataPromises = matchInfo.map(async (matchId: string) => {
        const matchDataResponse =
          await this.apiService.getMatchDataInfos(matchId);
        const matchData = matchDataResponse.data; // AxiosResponse 객체의 data 프로퍼티로부터 데이터 추출
        //console.log("데이터확인", matchData)
        return this.extractMatchData(nickname, matchData);
      });

      const matchDatas = await Promise.all(matchDataPromises);
      /*
      위의 코드에서 matchDataPromises는 map 함수로 생성된 프로미스 배열이고, 
      Promise.all을 사용하여 이 배열의 모든 프로미스가 완료될 때까지 기다립니다. 
      그리고 그 결과는 모든 프로미스가 완료된 후에 반환됩니다.
      */

      return matchDatas;
    } catch (error) {
      console.error('Error occurred:', error);
      throw error; // 예외 다시 던지기
    }
  }

  private extractMatchData(
    nickname: string,
    matchData: MatchDataType,
  ): DataType {
    // matchData.metadata가 null 또는 undefined인지 확인합니다.
    if (!matchData.metadata) {
      throw new Error('Metadata is missing in match data.');
    }

    // 필요한 데이터만 추출하여 반환
    const extractedData: DataType = {
      nickname,
      matchData: {
        metadata: {
          matchId: matchData.metadata.matchId,
          dataVersion: matchData.metadata.dataVersion,
          participants: matchData.metadata.participants,
        },
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
              kda: participant.challenges.kda,
              item0: participant.item0,
              item1: participant.item1,
              item2: participant.item2,
              item3: participant.item3,
              item4: participant.item4,
              item5: participant.item5,
              item6: participant.item6,
            }),
          ),
          platformId: matchData.info.platformId,
          queueId: matchData.info.queueId,
          teams: matchData.info.teams.map((team) => ({
            //팀은 100  / 200  으로 두팀 존재
            teamId: team.teamId,
            //true 는 승자 false 는 패자
            win: team.win,
            //전부 뽑아도되는 경우
            //bans: team.bans,
            //ban 정보중 필요한것들만 뽑을려고하는경우
            bans: team.bans.map((ban) => ({ championId: ban.championId, pickTurn: ban.pickTurn })),
            // objectives: team.objectives,
            objectives: {
              baron: {
                first: team.objectives.baron.first,
                kills: team.objectives.baron.kills
              },
              champion: {
                first: team.objectives.champion.first,
                kills: team.objectives.champion.kills
              },
              dragon: {
                first: team.objectives.champion.first,
                kills: team.objectives.champion.kills
              }
            }

          }))
        },
      },
    };
    console.log('가공된 데이터', extractedData);
    //console.log(JSON.stringify(extractedData)); //JSON 형식으로 원본그대로 보고싶으면 이렇게한다.

    return extractedData;
  }
}
