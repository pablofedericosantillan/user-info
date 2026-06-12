import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CorsConfig } from './cors/cors.config';

export enum NodeEnv {
  Development = 'develop',
}

export class EnvConfig {
  appName = 'Proyect test';

  @IsEnum(NodeEnv)
  env: NodeEnv = (process.env.NODE_ENV as NodeEnv) ?? NodeEnv.Development;

  @Type(() => Number)
  @IsInt()
  port = process.env.PORT || 8000;

  @Type()
  @ValidateNested()
  cors: CorsConfig = new CorsConfig();

  @IsNotEmpty()
  @IsString()
  MONGO_URI: string = process.env.MONGO_URI;

  @IsNotEmpty()
  @IsString()
  GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID;

  @IsNotEmpty()
  @IsString()
  GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET;

  @IsNotEmpty()
  @IsString()
  JWT_SECRET: string = process.env.JWT_SECRET;

  @IsOptional()
  @IsString()
  BACKEND_URL: string = process.env.BACKEND_URL ?? 'http://localhost:8000';

  @IsOptional()
  @IsString()
  FRONTEND_URL: string = process.env.FRONTEND_URL ?? 'http://localhost:3001';
}
