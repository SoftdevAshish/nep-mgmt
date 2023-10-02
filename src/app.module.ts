import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './commons/database/database.module';
import { ClientsModule } from './routes/clients/clients.module';
import { AuthModule } from './routes/auth/auth.module';
import { MailService } from './routes/mail/mail.service';

@Module({
  imports: [DatabaseModule, ClientsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
