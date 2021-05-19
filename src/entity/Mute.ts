import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn, CreateDateColumn, UpdateDateColumn
} from "typeorm";
import { User } from './User';

@Entity()
export class Mute {
  @PrimaryGeneratedColumn()
  id: number;

  // @ts-ignore
  @ManyToOne(() => User, (user) => user.mutes)
  @JoinColumn()
  user: User;

  @Column({ length: 255 })
  reason: string;

  @Column()
  duration: number;

  // @ts-ignore
  @ManyToOne(() => User, (user) => user.muted)
  @JoinColumn()
  mutedBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
