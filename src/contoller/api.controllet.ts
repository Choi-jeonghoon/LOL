import { Controller, Get, Query } from '@nestjs/common';
import { ProcessService } from 'src/services/process.service';

@Controller('/')
export class MainController {
  constructor(private readonly processService: ProcessService) {}

  // 매치정보중 알파벳은 제거하고 숫자부분만 가져와보기
  @Get('/')
  async getMatchInfoNumbers(
    @Query('nickname') nickname: string,
  ): Promise<object> {
    const result = this.processService.getMatchHistoryExcludeAlphabet(nickname);
    return result;
  }
}
