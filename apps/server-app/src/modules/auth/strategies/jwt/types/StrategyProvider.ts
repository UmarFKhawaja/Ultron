import { Strategy } from 'passport-jwt';

export type StrategyProvider = () => Strategy;
