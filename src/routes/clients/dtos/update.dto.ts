import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { SystemTypes } from '../../enum/systemtypes.enum';
import {PartialType} from "@nestjs/mapped-types";
import {CreateClientDto} from "./create.dto";

export class UpdateClientDto extends PartialType(CreateClientDto){

}
