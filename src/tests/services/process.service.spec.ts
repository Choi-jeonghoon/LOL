import { Test, TestingModule } from '@nestjs/testing';
import { ProcessService } from '../../services/process.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { ApiService } from 'src/services/api.service';

describe('process.service.spec', () => {
  let app: INestApplication;
  let service: ProcessService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env'],
          cache: true,
        }),
      ],
      providers: [ProcessService, ApiService],
    }).compile();

    app = module.createNestApplication();
    service = module.get(ProcessService);

    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('임시테스트', async () => {
    const result = await service.getMatchHistoryExcludeAlphabet('BT102030');

    console.log(result);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Array<string>);
  });
});
