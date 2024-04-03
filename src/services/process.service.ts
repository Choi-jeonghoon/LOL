import { Injectable } from '@nestjs/common';
import { ApiService } from './api.service';

@Injectable()
export class ProcessService {
    constructor(private readonly apiService: ApiService) { }

    async getMatchHistoryExcludeAlphabet(nickname: string) {
        const userInfo = await this.apiService.getUserInfo(nickname);
        const matchInfo = await this.apiService.getMatchInfo(userInfo.puuid);
        const result = matchInfo.map((item) => {
            return item.replace('KR_', '');
        });

        console.log("결과", result);

        return result;
    }
}
