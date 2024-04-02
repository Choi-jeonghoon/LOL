import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ProcessService } from './process.service';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class ApiService {
  // private readonly riotIdApiUrl: string;
  // private readonly riotMatchUrl: string;
  // private readonly riotApiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly processService: ProcessService,
    private readonly configService: ConfigService
  ) {

    // this.riotIdApiUrl = process.env.RIOT_ID_URL;
    // this.riotMatchUrl = process.env.RIOT_MATCH_URL;
    // this.riotApiKey = process.env.RIOT_API_KEY;
  }

  async search(nickname: string): Promise<object> {
    // const apiUrl = `${this.riotIdApiUrl}${nickname}`;
    // const apiKey = this.riotApiKey;

    const apiUrl = this.configService.get("RIOT_ID_URL");
    const apiKey = this.configService.get("RIOT_API_KEY");
    const riotMatchUrl = this.configService.get('RIOT_MATCH_URL');

    console.log(apiUrl + ' / ' + apiKey);

    try {
      // 매치 정보 가져오기
      const infoData = await this.httpService
        .get(apiUrl, { headers: { 'X-Riot-Token': apiKey } })
        .toPromise();
      console.log("service", infoData.data);

      const processedData = await this.processService.infoProcess(infoData.data);
      console.log("가공되서온 ID 값", processedData.id);
      console.log("가공되서온 puuid 값", processedData.puuid);

      // 매치 ID를 가져오는 URL 구성
      const matchIdUrl = `${riotMatchUrl.replace('{puuid}', processedData.puuid)}&start=0&count=20`;

      console.log("매치 ID를 가져오는 URL", matchIdUrl);

      const matchIdResponse = await this.httpService
        .get(matchIdUrl, { headers: { 'X-Riot-Token': apiKey } })
        .toPromise();

      // 매치 정보 데이터 반환
      return matchIdResponse.data;
    } catch (error) {
      // API 호출 중 에러가 발생하면 적절한 오류 메시지를 던집니다.
      console.log(error.message);
      throw new Error('API 호출 중 오류가 발생했습니다.');
    }
  }

  async beError(): Promise<any> {
    throw new Error('에러임');
  }
}
