import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn, CreateDateColumn, UpdateDateColumn
} from "typeorm";
import { User } from './User';

@Entity()
export class Kick {
  @PrimaryGeneratedColumn()
  id: number;

  // @ts-ignore
  @ManyToOne(() => User, (user) => user.kicks)
  @JoinColumn()
  user: User;

  @Column({ length: 255 })
  reason: string;

  // @ts-ignore
  @ManyToOne(() => User, (user) => user.kicked)
  @JoinColumn()
  kickedBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
