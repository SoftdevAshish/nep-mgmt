import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { SystemTypes } from '../../enum/systemtypes.enum';

export class CreateClientDto {
  @ApiProperty()
  @IsNotEmpty()
  clientName: string;

  @ApiProperty()
  clientContractDate: Date;

  @ApiProperty()
  clientExpiryDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  systemType: SystemTypes;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  clientEmail: string;

  @ApiProperty()
  @IsNotEmpty()
  phone: string;
}
