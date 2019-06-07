import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    MenuModule,
  ],
})

export class SysModule {
}
