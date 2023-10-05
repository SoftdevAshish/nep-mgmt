import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity, JoinTable, ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Roles } from '../../enum/roles.enum';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import CommonColumns from '../../../helpers/CommonColumns';

import {RoleEntity} from "../../role/entities/role.entity";

@Entity({ name: 'users' })
export class User extends CommonColumns{

  @Column()
  @IsNotEmpty()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ unique: true })
  phone: string;

  @Exclude()
  @Column()
  @IsNotEmpty()
  password: string;

  //many user can have many roles
  @ManyToMany(() => RoleEntity, (role) => role.users,{cascade:true})
  @JoinTable()
  roles: RoleEntity[];

  @Exclude()
  @Column({ default: true })
  active: boolean;

  @Exclude()
  @Column({ nullable: true })
  hashRt: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
