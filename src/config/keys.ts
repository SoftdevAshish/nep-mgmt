import { SetMetadata } from '@nestjs/common';
import { configService } from "./config.service";

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const Private = configService.getSecretKey();
export const Time = '86400s';
