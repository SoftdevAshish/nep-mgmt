import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { access_strategy } from '../../../../config/config';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { JwtPayload } from '../types/JwtPayload';
import { JwtPayloadRefresh } from '../types/JwtPayloadRefresh';

@Injectable()
export class RefreshStrategy extends PassportStrategy(
  Strategy,
  access_strategy,
) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
      secretOrKey: configService.get('REFRESH_SECRET_KEY'),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload): JwtPayloadRefresh {
    const refreshToken = req
      ?.get('authorization')
      ?.replace('Bearer', '')
      .trim();
    if (!refreshToken) {
      throw new ForbiddenException('Refresh Token Mismatch');
    }
    return {
      ...payload,
      refreshToken,
    };
  }
}
