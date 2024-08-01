import { Strategy } from 'passport-google-oauth20';

export type StrategyProvider = () => Strategy;
