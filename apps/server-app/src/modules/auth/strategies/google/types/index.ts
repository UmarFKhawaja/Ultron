import { Profile, VerifyCallback as DoneFunction } from 'passport-google-oauth20';

export type VerifyFunction = (accessToken: string, refreshToken: string, profile: Profile, done: DoneFunction) => void;
