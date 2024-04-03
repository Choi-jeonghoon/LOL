import { ApiService } from './api.service';
export declare class ProcessService {
    private readonly apiService;
    constructor(apiService: ApiService);
    getMatchHistoryExcludeAlphabet(nickname: string): Promise<any[]>;
    extractMatchData(data: {
        info: {
            queueId: string;
            gameDuration: string;
            gameStartTimestamp: string;
            gameEndTimestamp: string;
            participants: any[];
            teams: any[];
        };
    }): {
        queueId: string;
        gameDuration: string;
        gameStartTimestamp: string;
        gameEndTimestamp: string;
        participants: any[];
        teams: any[];
    };
}
