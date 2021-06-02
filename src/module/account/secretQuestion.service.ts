import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  SecretQuestion,
  SecretQuestionDocument,
} from './schemas/SecretQuestion.schema';
import { CreateSecretQuestionDTO } from './dtos/CreateSecretQuestion.dto';

@Injectable()
export class SecretQuestionService {
  constructor(
    @InjectModel(SecretQuestion.name)
    private secretQuestionModel: Model<SecretQuestionDocument>,
  ) {}

  async create(data: CreateSecretQuestionDTO): Promise<void> {
    const secretQuestion = new this.secretQuestionModel(data);

    await secretQuestion.save();
  }
}
