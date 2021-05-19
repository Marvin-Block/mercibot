import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn, CreateDateColumn, UpdateDateColumn
} from "typeorm";
import { User } from './User';

@Entity()
export class Warning {
  @PrimaryGeneratedColumn()
  id: number;

  // @ts-ignore
  @ManyToOne(() => User, (user) => user.warns)
  @JoinColumn()
  user: User;

  @Column({ length: 255 })
  reason: string;

  // @ts-ignore
  @ManyToOne(() => User, (user) => user.warned)
  @JoinColumn()
  warnedBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
