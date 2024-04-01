import { Module } from '@nestjs/common';
import { ApiService } from './services/api.service';


@Module({
  imports: [],
  controllers: [],
  providers: [ApiService],
})
export class AppModule { }
