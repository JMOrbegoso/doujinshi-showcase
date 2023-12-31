import { loggerMiddleware } from './logger-middleware';
import { showcaseApi } from '@/services/showcase-api';

export const middlewares = [loggerMiddleware, showcaseApi.middleware];
