import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SysModule } from './modules/sys/sys.module';

@Module({
  imports: [TypeOrmModule.forRoot(), SysModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
