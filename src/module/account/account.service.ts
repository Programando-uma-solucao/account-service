import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';

import { CreateUserDTO } from './dtos/CreateUser.dto';
import { User, UserDocument, UserRoles } from './schemas/User.schema';
import { CipherServiceConfig } from 'src/config/microservices.config';
import { SecretQuestionService } from './secretQuestion.service';
import { GenerateJwtDTO } from './dtos/GenerateJwt.dto';
import { EncryptDataDto } from './dtos/EncryptData.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(CipherServiceConfig.name)
    private readonly cipherService: ClientProxy,
    private readonly secretQuestionService: SecretQuestionService,
  ) {}

  async create(data: CreateUserDTO) {
    const encryptedData = await this.cipherService
      .send<any, EncryptDataDto>('encrypt', {
        toEncrypt: data,
        ignore: ['role', 'sex', 'tags'],
      })
      .toPromise();

    const foundUser = await this.userModel.findOne({
      emailHash: encryptedData.emailHash,
    });

    if (foundUser) {
      throw new RpcException({
        message: 'This email has already been registered',
        httpCode: 400,
      });
    }

    const dataToSave = {
      ...encryptedData,
      password: encryptedData.passwordHash,
      sex: data.sex,
      role: data.role,
    };

    if (data.role === UserRoles.LAWYER && data.tags && data.oab) {
      dataToSave['tags'] = data.tags;
      dataToSave['oab'] = data.oab;
    }

    const createdUser = new this.userModel(dataToSave);
    const savedUser = await createdUser.save();

    await this.secretQuestionService.create({
      question: encryptedData.secretQuestion,
      answer: encryptedData.secretAnswer,
      questionHash: encryptedData.secretQuestionHash,
      answerHash: encryptedData.secretAnswerHash,
      userId: savedUser._id,
    });

    const token = await this.cipherService
      .send<{ token: string }, GenerateJwtDTO>('generateJwt', {
        email: data.email,
        id: savedUser.id,
        name: data.name,
        role: data.role,
      })
      .toPromise();

    return token;
  }
}
