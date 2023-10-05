import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Private } from "../../config/keys";
import { unauthorizedErrorMessage } from '../../utils/responses';
import {AuthService} from "../../routes/auth/auth.service";
import {User} from "../../routes/auth/entities/user.entity";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: Private
    });
  }

  async validate(payload: any): Promise<any> {
    const timePayload = payload.exp;
    let expiryDate = new Date(0); // The 0 there is the key, which sets the date to the epoch
    expiryDate.setUTCSeconds(timePayload);
    const currentDate = new Date();

    if(currentDate >= expiryDate ){
      return unauthorizedErrorMessage("Token has expired", "Token")
    }
    else{
      const user: User = await this.authService.returnUser(payload.id);
      return user ? user : null;
    }
  }
}
