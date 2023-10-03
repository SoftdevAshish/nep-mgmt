import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './commons/database/database.module';
import { ClientsModule } from './routes/clients/clients.module';
import { AuthModule } from './routes/auth/auth.module';
import { MailService } from './routes/mail/mail.service';
import { MailModule } from './routes/mail/mail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    ClientsModule,
    AuthModule,
    MailModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
