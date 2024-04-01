import { Test, TestingModule } from '@nestjs/testing';
import { ApiService } from '../../services/api.service';
import { HttpModule } from '@nestjs/axios'; //외부 API를 사용 하기위해서 추가 설치했다.

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ApiService],
    }).compile();

    service = module.get<ApiService>(ApiService);
  });

  it('should return data for success nickname', async () => {
    const nickname = 'BT102030';
    const data = await service.search(nickname);
    console.log('개인정보 확인============', data);

    expect(data).toBeDefined();
    expect(data).toHaveProperty('name', '비에고의 품격');
  });
});
