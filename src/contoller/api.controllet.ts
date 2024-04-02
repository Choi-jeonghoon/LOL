import { Controller, Get, Query } from "@nestjs/common";
import { ApiService } from "src/services/api.service";

@Controller('/')
export class MainController {
    constructor(
        private readonly apiService: ApiService
    ) { }

    @Get('/')
    async getUserInfo(@Query('nickname') nickname: string): Promise<object> {
        try {
            const infoData = await this.apiService.search(nickname);
            console.log("test========================", infoData);
            return infoData;
        } catch (error) {
            console.error(error);
            throw new Error('사용자 정보를 가져오는 중에 오류가 발생했습니다.');
        }
    }
}
