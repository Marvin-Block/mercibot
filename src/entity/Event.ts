import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from './User';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique:true })
  name: string;

  @Column()
  description: string;

  @Column()
  startAt: Date;

  @Column()
  endAt: Date;

  @ManyToMany((type) => User, (user) => user.events, {
    cascade: true
  })
  @JoinTable()
  users: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
