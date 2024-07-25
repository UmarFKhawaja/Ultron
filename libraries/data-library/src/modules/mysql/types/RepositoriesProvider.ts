import { Account, User, VerificationRequest } from '@ultron/core-library';
import { Repository } from 'typeorm';

export type RepositoriesProvider = () => Promise<{
  userRepository: Repository<User>;
  accountRepository: Repository<Account>;
  verificationRequestRepository: Repository<VerificationRequest>;
}>;
