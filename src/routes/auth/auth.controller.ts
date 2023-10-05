import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { errorMessage, successMessage } from '../../utils/responses';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '../../config/keys';
import { LoginUserDto } from './dto/loginUserDto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { User } from '../../decorators/user.decorators';
import { Request } from 'express';
import {CreateUserDto} from "./dto/create-user.dto";

@ApiTags('Nepvent Management Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Public()
  @ApiOperation({
    summary: `Create new User.`,
  })
  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @Public()
  @ApiOperation({
    summary: `Login  User.`,
  })
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const gotUser = await this.authService.compareUser(loginUserDto);
      if (!gotUser) errorMessage('Invalid username or password', 'username');
      const token = await this.authService.generateJWT(gotUser);
      const {
        email,
        name,
        phone,
        roles,
        id,
      } = gotUser;
      const user = {
        id,
        email,
        name,
        phone,
        roles,
      };
      return successMessage('Login Successful', user);
    } catch (err) {
      throw err;
    }
  }


}
