import CommonColumns from "../../../helpers/CommonColumns";
import { BeforeInsert, Column, Entity, ManyToMany } from "typeorm";
import { Role } from "../../../config/enums";
import {User} from "../../auth/entities/user.entity";

@Entity('role')
export class RoleEntity extends CommonColumns{
  @Column({
    unique: true,
    type: 'enum',
    enum: Role,
    nullable: false
  })
  name: Role;

  // @BeforeInsert()
  // async nameToUpperCase(){
  //   this.name = this.name.toLocaleUpperCase();
  // }

  @ManyToMany(() => User)
  users:User[]
}
