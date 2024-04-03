import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class ApiService {
    private readonly httpService;
    private readonly configService;
    private userApiUrl;
    private matchApiUrl;
    private matchApitInfoUrl;
    private apiKey;
    constructor(httpService: HttpService, configService: ConfigService);
    getUserInfo(nickname: string): Promise<any>;
    getMatchInfo(puuid: string): Promise<any>;
    getMatchDataInfos(matchId: string): Promise<import("axios").AxiosResponse<any, any>>;
    private APIRequest;
}
