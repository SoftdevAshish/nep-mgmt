import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Roles } from '../../enum/roles.enum';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class User {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @ApiProperty({ description: 'User Fullname' })
  name: string;

  @Column({ unique: true })
  @IsEmail()
  @ApiProperty({ description: 'User Email' })
  email: string;

  @ApiProperty({ description: 'User Phone Number' })
  @Column({ unique: true })
  phone: string;

  @Exclude()
  @Column()
  @IsNotEmpty()
  password: string;

  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.viewer,
  })
  role: Roles;

  @Exclude()
  @Column({ default: true })
  active: boolean;

  @Exclude()
  @Column({ nullable: true })
  hashRt: string;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
