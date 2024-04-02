import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ApiService } from './services/api.service';
import { MainController } from './contoller/api.controllet'
import { ProcessService } from './services/process.service';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [HttpModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [MainController],
  providers: [ApiService, ProcessService, ConfigService],
})
export class AppModule { }
