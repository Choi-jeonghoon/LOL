import { Test, TestingModule } from '@nestjs/testing';
import { ApiService } from '../../services/api.service';
import { ProcessService } from '../../services/process.service'; // ProcessService 추가
import { HttpModule } from '@nestjs/axios';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ApiService, ProcessService], // ProcessService 추가
    }).compile();

    service = module.get<ApiService>(ApiService);
  });

  it('should return data for success nickname', async () => {
    const nickname = 'BT102030';
    const data = await service.search(nickname);
    console.log('개인정보 확인============', data);

    //데이터가 undefined인지 아닌지 확인해서 API호출이 성공했는지 확인
    expect(data).toBeDefined();
    //data라는 객체가 name 속성을 가지고 있고 그 값이 nickname 에 할당한 값인지 가정하는 것.
    expect(data).toHaveProperty('name', 'BT102030');
  });

  // 이건 테스트 도중 예상치 못한 에러가 발생했다 가정
  it('it should err', async () => {
    console.log('두번째 테스트');
    throw new Error('고의적인 에러');
  });

  // 존재하지 않은 닉네임을 파라미터로 보내주고 테스트에서 에러가 발생하기를 기대한다.
  it('it should throw an err for nickname', async () => {
    const errnickname = 'dldldldldldlddll';
    await expect(service.search(errnickname)).rejects.toThrow();
  });
});
