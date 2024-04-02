import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ApiService } from './services/api.service';
import { MainController } from './contoller/api.controllet'
import { ProcessService } from './services/process.service';


@Module({
  imports: [HttpModule],
  controllers: [MainController],
  providers: [ApiService, ProcessService],
})
export class AppModule { }
