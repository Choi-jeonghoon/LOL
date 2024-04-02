import { HttpService } from '@nestjs/axios';
export declare class ApiService {
    private readonly httpService;
    private readonly riotApiUrl;
    private readonly riotApiKey;
    constructor(httpService: HttpService);
    search(nickname: string): Promise<object>;
    beError(): Promise<any>;
}
