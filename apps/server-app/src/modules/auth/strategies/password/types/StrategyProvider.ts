import { Strategy } from 'passport-local';

export type StrategyProvider = () => Strategy;
