import { Module } from '@nestjs/common';
import { createConnection } from 'typeorm';

import { ConfigService } from '../config/config.service';

const connectionFactory = {
  provide: 'CONNECTION',
  useFactory: (configService: ConfigService) => {
    console.log(configService.get('DATABASE_TYPE'));
    return createConnection({
      type: 'mysql',
      host: configService.get('DATABASE_HOST'),
      port: configService.get('DATABASE_PORT'),
      username: configService.get('DATABASE_USERNAME'),
      password: configService.get('DATABASE_PASSWORD'),
      database: configService.get('DATABASE_NAME'),
      entities: configService.get('DATABASE_ENTITIES'),
    })
  },
  inject: [ConfigService],
};

@Module({
  providers: [connectionFactory],
})

export class DatabaseModule { }