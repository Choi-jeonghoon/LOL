import { INestApplication } from "@nestjs/common";
import { ApiService } from "src/services/api.service";
import { TestingModule, Test } from '@nestjs/testing'

describe("api.service.spec", () => {
    let app: INestApplication;
    let service: ApiService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [ApiService],
            controllers: [],
            exports: []
        }).compile();

        app = module.createNestApplication();
        service = module.get<ApiService>(ApiService);
    });

    afterAll(async () => {
        await app.close();
    });

    // 이건 성공적인 케이스
    it('it should be json data of current game', async () => {
        const data = await service.search('테스트닉네임');

        console.log(data);
    })

    // 이건 테스트 도중 예상치 못한 에러가 발생했다 가정
    it('it should 뭐 어쩌구', async () => {
        console.log("두번째 테스트");
        throw new Error("고의적인 에러");
    })

    // 이건 테스트 하긴 하는데 당연히 오류가 발생해야 할 상황을 가정
    it('it should be throw', async () => {
        await expect(service.beError()).rejects.toThrow();
    })
});