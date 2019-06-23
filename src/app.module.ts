import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from './processors/config/config.module';
import { DatabaseModule } from './processors/database/database.module';
import { SysModule } from './modules/sys/sys.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    SysModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
