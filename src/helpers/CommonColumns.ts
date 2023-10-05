import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

abstract class CommonColumns extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({type: 'timestamptz', precision: 3, select: false })
  createdAt!: Date;

  @UpdateDateColumn({type: 'timestamptz', precision: 3, select: false })
  updatedAt!: Date;

  @DeleteDateColumn({type: 'timestamptz', precision: 3, select: false })
  deletedAt?: Date;
}

export default CommonColumns;
