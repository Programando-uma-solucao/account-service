import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';

export type UserDocument = User & Document;

export enum UserRoles {
  COMMOM = 'COMMOM',
  LAWYER = 'LAWYER',
}

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  @Exclude()
  nameHash: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;
  @Prop({
    required: true,
    unique: true,
  })
  @Exclude()
  emailHash: string;

  @Prop({
    required: true,
  })
  phone: string;
  @Prop({
    required: true,
  })
  @Exclude()
  phoneHash: string;

  @Prop({
    required: true,
  })
  cpf: string;
  @Prop({
    required: true,
  })
  @Exclude()
  cpfHash: string;

  @Prop({
    required: true,
  })
  address: string;
  @Prop({
    required: true,
  })
  @Exclude()
  addressHash: string;

  @Prop({
    required: false,
  })
  oab?: string;
  @Prop({
    required: false,
  })
  @Exclude()
  oabHash?: string;

  @Prop({
    required: true,
  })
  @Exclude()
  password: string;

  @Prop({
    required: true,
  })
  sex: string;

  @Prop({
    enum: UserRoles,
    required: true,
  })
  role: string;

  @Prop({
    type: [String],
    required: false,
  })
  tags?: Array<string>;
}

export const UserSchema = SchemaFactory.createForClass(User);
