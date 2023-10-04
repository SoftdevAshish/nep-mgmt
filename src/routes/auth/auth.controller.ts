import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthLoginDto } from './dtos/AuthLogin.dto';
import { AuthDto } from './dtos/auth.dto';

@ApiTags('Users Control')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('login')
  signIn(@Body() userDetails: AuthLoginDto) {
    return this.authService.login(userDetails);
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
