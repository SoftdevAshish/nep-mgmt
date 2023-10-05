import { Module } from '@nestjs/common';
import { ClientsModule } from './routes/clients/clients.module';
import { MailModule } from './routes/mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import {TypeOrmModule} from "@nestjs/typeorm";
import {configService} from "./config/config.service";
import {AppService} from "./app.service";
import {RolesGuard} from "./helpers/roles.guard";
import {JwtAuthGuard} from "./helpers/jwt/jwt-auth-guard";
import {Role} from "./config/enums";
import {AuthModule} from "./routes/auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig(process.env.MODE)),
    ClientsModule,
    AuthModule,
    MailModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  // controllers: [AppController],
  providers: [
    {
      provide: 'ROLES',
      useValue: Role,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AppService,
  ],
})
export class AppModule {}
