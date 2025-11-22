import { IsString } from 'class-validator';

export class MongoConfigBase {
  @IsString()
  uri?: string = process.env.MONGO_ATLAS_URI;
}
