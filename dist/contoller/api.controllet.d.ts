import { ProcessService } from 'src/services/process.service';
export declare class MainController {
    private readonly processService;
    constructor(processService: ProcessService);
    getMatchInfoNumbers(nickname: string): Promise<object>;
}
