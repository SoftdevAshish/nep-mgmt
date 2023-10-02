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

@Entity({ name: 'clients' })
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  @IsNotEmpty()
  clientName: string;

  @ApiProperty()
  @Column({ type: 'datetime' })
  clientContractDate: Date;

  @ApiProperty()
  @Column({ type: 'datetime' })
  clientExpiryDate: Date;

  @ApiProperty()
  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiProperty()
  @Column({ default: true })
  active: boolean;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: SystemTypes,
    default: SystemTypes.Nepvent_v1,
  })
  systemType: string;

  @ApiProperty()
  @Column()
  @IsEmail()
  @IsNotEmpty()
  clientEmail: string;

  @ApiProperty()
  @Column()
  @IsNotEmpty()
  phone: string;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}
