import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from '../../commons/database/database.module';
import { userProviders } from './user.providers';
import { MailModule } from '../mail/mail.module';
import { EmailService } from '../mail/email.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AccessStrategy } from './strategies/access.strategy';
import { RefreshStrategy } from './strategies/refresh.strategy';

@Module({
  imports: [DatabaseModule, MailModule, JwtModule.register({}), ConfigModule],
  controllers: [AuthController],
  providers: [
    ...userProviders,
    AuthService,
    EmailService,
    AccessStrategy,
    RefreshStrategy,
  ],
})
export class AuthModule {}
