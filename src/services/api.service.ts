import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiService {
  private userApiUrl: string;
  private matchApiUrl: string;
  private matchApitInfoUrl: string;
  private apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.userApiUrl = this.configService.get<string>('RIOT_API_USER');
    this.matchApiUrl = this.configService.get<string>('RIOT_API_MATCH');
    this.matchApitInfoUrl = this.configService.get<string>(
      'RIOT_API_MATCH_INFO',
    );

    this.apiKey = this.configService.get<string>('RIOT_API_KEY');
  }

  // 유저 정보 가져오기
  async getUserInfo(nickname: string) {
    const userInfo = await this.APIRequest(`${this.userApiUrl}${nickname}`);

    return userInfo.data;
  }

  // 매치 정보 가져오기
  async getMatchInfo(puuid: string) {
    const matchInfo = await this.APIRequest(
      `${this.matchApiUrl.replace('{puuid}', puuid)}`,
    );

    return matchInfo.data;
  }

  //많은 매치 정보 게임들의 모든 정보 가져오기
  async getMatchDataInfos(matchId: string) {
    const MatchDatainfo = await this.APIRequest(
      `${this.matchApitInfoUrl}${matchId}`,
    );
    return MatchDatainfo;
  }

  // API Service 내에서만 재사용할 지역함수
  private async APIRequest(URL: string) {
    const result = await this.httpService
      .get(URL, {
        headers: { 'X-Riot-Token': this.apiKey },
      })
      .toPromise();

    return result;
  }
}
