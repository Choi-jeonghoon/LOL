import { ApiService } from './api.service';
export declare class ProcessService {
    private readonly apiService;
    constructor(apiService: ApiService);
    getMatchHistoryExcludeAlphabet(nickname: string): Promise<any[]>;
    private extractMatchData;
}
