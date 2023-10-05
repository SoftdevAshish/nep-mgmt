import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { SystemTypes } from '../../enum/systemtypes.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import CommonColumns from "../../../helpers/CommonColumns";

@Entity({ name: 'clients' })
export class Client extends CommonColumns{


  @Column()
  @IsNotEmpty()
  clientName: string;

  @Column({ type: 'datetime' })
  clientContractDate: Date;

  @ApiProperty()
  @Column({ type: 'datetime' })
  clientExpiryDate: Date;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  slug: string;

  @Column({ default: true })
  active: boolean;

  @Column({
    type: 'enum',
    enum: SystemTypes,
    default: SystemTypes.Nepvent_v1,
  })
  systemType: string;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  clientEmail: string;

  @ApiProperty()
  @Column()
  @IsNotEmpty()
  phone: string;


}
