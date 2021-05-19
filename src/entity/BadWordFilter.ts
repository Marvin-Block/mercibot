import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class BadWordFilter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 18 })
  discordId: string;

  @Column({unique:true})
  value: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
