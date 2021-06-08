import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  SecretQuestionToken,
  SecretQuestionTokenDocument,
} from './schemas/SecretQuestionToken.schema';

import { CreateSecretQuestionTokenDTO } from './dtos/CreateSecretQuestionToken.dto';

@Injectable()
export class SecretQuestionTokenService {
  constructor(
    @InjectModel(SecretQuestionToken.name)
    private secretQuestionTokenModel: Model<SecretQuestionTokenDocument>,
  ) {}

  async create(data: CreateSecretQuestionTokenDTO): Promise<void> {
    const secretQuestionToken = new this.secretQuestionTokenModel(data);

    await secretQuestionToken.save();
  }
}
