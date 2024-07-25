import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Account } from './Account';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  displayName!: string;

  @Column({
    unique: true
  })
  userName!: string;

  @Column({
    unique: true
  })
  emailAddress!: string;

  @Column({
    nullable: true
  })
  saltHash!: string;

  @Column({
    nullable: true
  })
  verifiedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => Account, (account: Account) => account.user)
  accounts!: Account[];
}
