import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class CommandEnabledChannel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 18 })
  discordId: string;

  @Column({ length: 18, unique:true })
  channelId: string;

  @Column()
  requiredLevel: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
