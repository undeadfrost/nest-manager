import { Module } from '@nestjs/common';
import { CatsController } from './cat.controller';
import { CatService } from './cat.service';

@Module({
  controllers: [CatsController],
  providers: [CatService],
})

export class CatModule {
}
