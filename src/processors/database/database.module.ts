import { Module, Injectable } from '@nestjs/common';
import { TypeOrmModule, TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { ConfigService } from '../config/config.service';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const path = process.env.NODE_ENV === 'debug' ? 'src' : 'dist';
    return {
      type: 'mysql',
      host: this.configService.get('DATABASE_HOST'),
      port: Number(this.configService.get('DATABASE_PORT')),
      username: this.configService.get('DATABASE_USERNAME'),
      password: this.configService.get('DATABASE_PASSWORD'),
      database: this.configService.get('DATABASE_NAME'),
      entities: [`${path}/**/*.entity{.ts,.js}`],
      synchronize: Boolean(this.configService.get('DATABASE_SYNCHRONIZE')),
      logging: Boolean(this.configService.get('DATABASE_LOGGING')),
      maxQueryExecutionTime: Number(this.configService.get('DATABASE_MAX_QUERY_EXECUTION_TIM')),
    };
  }
}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
    }),
  ],
})

export class DatabaseModule {
}
