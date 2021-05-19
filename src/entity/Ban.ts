import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn, CreateDateColumn, UpdateDateColumn
} from "typeorm";
import { User } from './User';

@Entity()
export class Ban {
  @PrimaryGeneratedColumn()
  id: number;

  // @ts-ignore
  @ManyToOne(() => User, (user) => user.bans, {
    cascade: true
  })
  @JoinColumn()
  user: User;

  @Column({ length: 255 })
  reason: string;

  // @ts-ignore
  @ManyToOne(() => User, (user) => user.banned, {
    cascade: true
  })
  @JoinColumn()
  bannedBy: User;

  @Column()
  duration: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
