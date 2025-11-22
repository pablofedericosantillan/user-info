import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { randomUUID } from 'crypto';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, default: () => randomUUID() })
  _id: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: false, default: Date.now })
  createdAt: Date;

  @Prop({ required: false, default: Date.now })
  updatedAt: Date;

  @Prop({ required: false, default: undefined })
  deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
