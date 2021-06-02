import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SecretQuestionDocument = SecretQuestion & Document;

@Schema()
export class SecretQuestion {
  @Prop({
    required: true,
  })
  question: string;

  @Prop({
    required: true,
  })
  answer: string;

  @Prop({
    required: true,
  })
  questionHash: string;

  @Prop({
    required: true,
  })
  answerHash: string;

  @Prop({
    required: true,
    unique: true,
    type: Types.ObjectId,
  })
  userId: string;
}

export const SecretQuestionSchema =
  SchemaFactory.createForClass(SecretQuestion);
