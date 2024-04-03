import { ApiService } from "src/services/api.service";
export declare class MainController {
    private readonly apiService;
    constructor(apiService: ApiService);
    getUserInfo(nickname: string): Promise<object>;
}
