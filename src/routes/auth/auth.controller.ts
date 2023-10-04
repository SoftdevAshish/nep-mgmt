import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthLoginDto } from './dtos/AuthLogin.dto';
import { AuthDto } from './dtos/auth.dto';
import { Public } from '../../commons/decorators/public.decorator';

@ApiTags('Users Control')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Public()
  @Post('login')
  signIn(@Body() userDetails: AuthLoginDto) {
    return this.authService.login(userDetails);
  }

  @ApiOperation({
    summary: `Create User.`,
    description: `Create User and sending mail with password after register`,
  })
  @Public()
  // @UseGuards(AccessGuard)
  @Post('register')
  signUp(@Body() userDetails: AuthDto) {
    return this.authService.register(userDetails);
  }
}
