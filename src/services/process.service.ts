import { Injectable } from '@nestjs/common';
import { ApiService } from './api.service';

@Injectable()
export class ProcessService {
  constructor(private readonly apiService: ApiService) { }

  async getMatchHistoryExcludeAlphabet(nickname: string): Promise<any[]> {
    try {
      const userInfo = await this.apiService.getUserInfo(nickname);
      const matchInfo = await this.apiService.getMatchInfo(userInfo.puuid);
      console.log('큐 잡힌 방 matchId', matchInfo);

      const matchDataPromises = matchInfo.map(async (matchId: string) => {
        const matchData = await this.apiService.getMatchDataInfos(matchId);
        return this.extractMatchData(matchData.data);
      });

      const matchDatas = await Promise.all(matchDataPromises);

      return matchDatas;
    } catch (error) {
      console.error('Error occurred:', error);
      throw error; // 예외 다시 던지기
    }
  }

  private extractMatchData(matchData: any): any {

    return matchData;
  }
}
