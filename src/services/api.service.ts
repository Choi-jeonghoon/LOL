import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as dotenv from 'dotenv';

@Injectable()
export class ApiService {
  private readonly riotApiUrl: string;
  private readonly riotApiKey: string;

  constructor(private readonly httpService: HttpService) {
    dotenv.config(); // .env 파일 로드

    this.riotApiUrl = process.env.RIOT_ID_URL;
    this.riotApiKey = process.env.RIOT_API_KEY;
  }

  async search(nickname: string): Promise<object> {
    const apiUrl = `${this.riotApiUrl}${nickname}`;
    const apiKey = this.riotApiKey;

    try {
      const response = await this.httpService
        .get(apiUrl, { headers: { 'X-Riot-Token': apiKey } })
        .toPromise();
      return response.data;
    } catch (error) {
      throw new Error('API 호출 중 오류가 발생했습니다.');
    }
  }

  async beError(): Promise<any> {
    throw new Error('에러임');
  }
}
/**
 * @TODO
 * 1. API 키 발급받고 .env 작성
 * 2. 환경변수 api.service.ts 에서 불러오기
 * 3. 닉네임 검색하는 로직 작성
 * 4. 컨트롤러 작성하기 전에 TDD 방식이니 테스트코드 먼저 작성
 * 5. 올 패스 받으면 컨트롤러 작성
 * 6. POSTMAN으로 최종 테스트
 *
 * 7. 그러고 나서 process.service 작성
 * ~~ 반복
 */
