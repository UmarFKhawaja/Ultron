import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { VerificationRequestPurpose } from './VerificationRequestPurpose';
import { VerificationRequestStatus } from './VerificationRequestStatus';

@Entity()
export class VerificationRequest {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  code!: string;

  @Column()
  userID!: string;

  @Column()
  resourceID!: string;

  @Column()
  resourceType!: string;

  @Column({
  })
  details!: object;

  @Column({
    enum: VerificationRequestPurpose
  })
  purpose!: VerificationRequestPurpose;

  @Column({
    enum: VerificationRequestStatus
  })
  status!: VerificationRequestStatus;

  @Column()
  expiresAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
