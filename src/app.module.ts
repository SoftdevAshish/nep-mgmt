import { Module } from '@nestjs/common';
import { DatabaseModule } from './commons/database/database.module';
import { ClientsModule } from './routes/clients/clients.module';
import { AuthModule } from './routes/auth/auth.module';
import { MailModule } from './routes/mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AccessGuard } from './commons/guards/access.guard';

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
  // controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: AccessGuard }],
})
export class AppModule {}
