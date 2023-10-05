import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'sadmin' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'sadmin' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: '9843065157' })
  phone: string;


  @ApiProperty({ example: '[1]' })
  role: string[];
}
