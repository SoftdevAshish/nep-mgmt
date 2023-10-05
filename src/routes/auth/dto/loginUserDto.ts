import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: '9843065125' })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  password: string;
}
