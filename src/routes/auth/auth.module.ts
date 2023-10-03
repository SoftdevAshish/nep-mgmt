import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from '../../commons/database/database.module';
import { userProviders } from './user.providers';
import { MailModule } from '../mail/mail.module';
import { EmailService } from '../mail/email.service';

@Module({
  imports: [DatabaseModule, MailModule],
  controllers: [AuthController],
  providers: [...userProviders, AuthService, EmailService],
})
export class AuthModule {}
