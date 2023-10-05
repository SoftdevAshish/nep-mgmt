import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { Private, Time } from "../../config/keys";
import { APP_GUARD } from "@nestjs/core";
import { JwtStrategy } from "../../helpers/jwt/jwt.strategy";
import { RoleEntity } from "../role/entities/role.entity";
import { UuidEntity } from './entities/uuid.entity';
import {User} from "./entities/user.entity";
import {JwtAuthGuard} from "../../helpers/jwt/jwt-auth-guard";

@Module({
  imports:[TypeOrmModule.forFeature([User,RoleEntity, UuidEntity, ]),
    PassportModule,
    JwtModule.register({
      secret: Private,
      signOptions: { expiresIn: Time },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    JwtStrategy,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
