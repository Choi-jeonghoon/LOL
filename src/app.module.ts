import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ApiService } from './services/api.service';
import { MainController } from './contoller/api.controllet';
import { ProcessService } from './services/process.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      cache: true,
    }),
  ],
  controllers: [MainController],
  providers: [ApiService, ProcessService],
})
export class AppModule {}
