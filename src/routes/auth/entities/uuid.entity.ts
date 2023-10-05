import CommonColumns from "../../../helpers/CommonColumns";
import { Column, Entity, ManyToOne } from 'typeorm';
import {User} from "./user.entity";

@Entity('uuid')
export class UuidEntity extends CommonColumns {
    @Column()
    expiry: Date;
  
    @Column()
    uuid: string;
  
    @Column({ default: true })
    active: boolean;
  
    @ManyToOne(() => User, (user) => user.id)
    user: User;
}
