import { User } from '@ultron/core-library';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import { stringify } from 'qs';
import { AUTH_CONSTANTS } from '../../../constants';

export function acceptFacebook(container: Container) {
  return async (req: Request, res: Response): Promise<void> => {
    const state: string = stringify(req.query['state']);

    const json: string = Buffer
      .from(state, 'base64')
      .toString('utf-8');

    const { path }: { path: string; } = JSON.parse(json) as { path: string; };

    const user: User = req.user as User;

    const token: string = await this.tokenManager.createToken(user);

    const redirectURL: URL = new URL('/app/accept/facebook', AUTH_CONSTANTS.Strategies.Facebook.redirectURL);

    redirectURL.searchParams.set('token', token);
    redirectURL.searchParams.set('path', path);

    res.redirect(redirectURL.toString());
  };
}
