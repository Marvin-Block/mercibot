import { Entity, PrimaryColumn, Column, ManyToMany, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from 'typeorm';
import { Event } from './Event';

@Entity()
export class User {
  @PrimaryColumn({
    length: 18,
    unique: true
  })
  discordId: string;

  @Column({ length: 32 })
  name: string;

  @Column({ default: null })
  permission: number;

  @Column({ default: null })
  email: string;

  @Column({ default: null })
  emailVerifiedAt: Date;

  @Column({ default: null })
  password: string;

  @Column({ default: null })
  birthday: Date;

  @Column({ default: null })
  age: number;

  @Column({ length: 255, default: null })
  bio: string;

  @Column({ default: 0 })
  level: number;

  @Column({ default: 0 })
  xp: number;

  @ManyToMany((type) => Event, (event) => event.users)
  events: Event[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
