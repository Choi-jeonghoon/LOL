import { HttpService } from '@nestjs/axios';
import { ProcessService } from './process.service';
import { ConfigService } from '@nestjs/config';
export declare class ApiService {
    private readonly httpService;
    private readonly processService;
    private readonly configService;
    constructor(httpService: HttpService, processService: ProcessService, configService: ConfigService);
    search(nickname: string): Promise<object>;
    beError(): Promise<any>;
}
