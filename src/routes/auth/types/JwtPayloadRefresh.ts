import { JwtPayload } from './JwtPayload';

export type JwtPayloadRefresh = JwtPayload & { refreshToken: string };
