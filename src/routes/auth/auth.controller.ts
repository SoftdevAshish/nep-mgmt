import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users Control')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn() {
    return this.authService.login();
  }

  @ApiOperation({
    summary: `Create User.`,
    description: `Create User and sending mail with password after register`,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  signUp(@Body() userDetails: AuthDto) {
    return this.authService.register(userDetails);
  }
}
