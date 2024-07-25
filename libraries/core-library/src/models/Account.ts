import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ProviderType } from './ProviderType';
import { User } from './User';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    enum: ProviderType
  })
  providerType!: ProviderType;

  @Column({
    unique: true
  })
  providerID!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => User, (user: User) => user.accounts)
  user!: User;
}
