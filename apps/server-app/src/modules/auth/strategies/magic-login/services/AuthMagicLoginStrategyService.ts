import { Request, Response } from 'express';
import { injectable } from 'inversify';
import Strategy from 'passport-magic-login';

@injectable()
export class AuthMagicLoginStrategyService {
  constructor(
    private readonly strategy: Strategy
  ) {
  }

  send(req: Request, res: Response): void {
    this.strategy.send(req, res);
  }
}
