import { HttpModule } from '@nestjs/axios'; //Nest.js에서 HTTP 클라이언트를 사용하기 위한 모듈입니다.
import { ConfigModule } from '@nestjs/config'; //Nest.js에서 환경 변수를 로드하고 사용하기 위한 모듈입니다.
import { Test, TestingModule } from '@nestjs/testing'; //Nest.js의 테스트 모듈과 테스팅 관련 기능을 가져옵니다.
import { INestApplication } from '@nestjs/common';
import { ApiService } from 'src/services/api.service'; //테스트할 서비스 및 애플리케이션 관련 클래스를 가져옵니다.
import { ProcessService } from 'src/services/process.service'; //테스트할 서비스 및 애플리케이션 관련 클래스를 가져옵니다.

//1. 테스트 환경 한번만 초기화
describe('api.service.spec', () => {
  let app: INestApplication; //INestApplication 인터페이스를 사용하여 애플리케이션을 모의(mock)하고 테스트 하도록
  let service: ApiService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // HTTP 클라이언트를 사용할 수 있도록 모듈을 추가
        HttpModule,
        //isGlobal 옵션을 통해 전역으로 사용하며, .env 파일을 사용하여 환경 변수를 로드하고 캐시를 활성화
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env'],
          cache: true,
        }),
      ],
      providers: [ProcessService, ApiService], // 테스트할 서비스 Class를 작성한다.
    }).compile(); //테스트 모듈을 컴파일하여 실행 가능한 모듈로 변환

    app = module.createNestApplication(); // Nest 애플리케이션을 생성
    service = module.get(ApiService); // 컴파일된 모듈에서 ApiService 인스턴스를 가져
    // 인스턴스란? 클래스를 사용하여 생성된 개별 객체이다.

    await app.init(); //Nest 애플리케이션을 초기화
  });

  //테스트 실행이 완료되고 서버가 더 이상 필요하지 않을 때 애플리케이션을 정리하는 데 사용
  //사용 이유는 메모리 누수를 방지하기 위해 종료
  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });
  // 유닛테스트
  it('should return user info', async () => {
    const result = await service.getUserInfo('BT102030');

    console.log('원본 데이터', result);

    // 결과가 null이 아니고, id와 name 속성을 포함하는지 확인
    expect(result).toBeDefined();
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name');

    // id와 name 속성 값이 예상한 것과 일치하는지 확인
    expect(result.id).toBe('9MhN5SsqLXwDfyPsj_pjJipDNQB6uLUg9jyLpcQxQWgPTQ');
    expect(result.name).toBe('BT102030');
  });

  it('should return match info', async () => {
    const result = await service.getMatchInfo(
      'uzwfy45qf6M-RguAY6nsKKjTHH2LI71pyjSmCs_jsHjLylgjvAZvjohxv5C-tgadh9nCanSburuHHA',
    );
    console.log('원본 매치게임 정보', result);

    expect(result).toBeDefined(); //값이 존재하는지 확인
    expect(typeof result).toBe('object'); //변수 타입이 객체인지 확인
  });

  it('should return matchGame info', async () => {
    const result = await service.getMatchDataInfos('KR_6919883975');
    console.log('매치된게임 정보', result);

    expect(result).toBeDefined(); //값이 존재하는지 확인
    expect(typeof result).toBe('object'); //변수 타입이 객체인지 확인
  });
});
