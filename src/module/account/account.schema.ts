import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
