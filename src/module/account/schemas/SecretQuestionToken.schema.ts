import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SecretQuestionTokenDocument = SecretQuestionToken & Document;

@Schema()
export class SecretQuestionToken {
  @Prop({
    required: true,
  })
  token: string;

  @Prop({
    required: true,
    unique: true,
    type: Types.ObjectId,
  })
  userId: string;
}

export const SecretQuestionTokenSchema =
  SchemaFactory.createForClass(SecretQuestionToken);
