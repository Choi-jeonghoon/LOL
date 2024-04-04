import { ApiService } from './api.service';
import { DataType } from '../types/interface';
export declare class ProcessService {
    private readonly apiService;
    constructor(apiService: ApiService);
    getMatchHistoryExcludeAlphabet(nickname: string): Promise<DataType[]>;
    private extractMatchData;
}
