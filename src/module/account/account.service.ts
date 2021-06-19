import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDTO } from './dtos/CreateUser.dto';
import { User, UserDocument, UserRoles } from './schemas/User.schema';
import { CipherServiceConfig } from 'src/config/microservices.config';
import { SecretQuestionService } from './secretQuestion.service';
import { GenerateJwtDTO } from './dtos/GenerateJwt.dto';
import { EncryptDataDto } from './dtos/EncryptData.dto';
import { RecoverSecretQuestionDTO } from './dtos/RecoverSecretQuestion.dto';
import { AnswerSecretQuestionDTO } from './dtos/AnswerSecretQuestion.dto';
import { BadRequest, NotFound, Unauthorized } from '../../common/error/http';
import { SecretQuestionDocument } from './schemas/SecretQuestion.schema';
import { SecretQuestionTokenService } from './secretQuestionToken.service';
import { ChangePasswordDTO } from './dtos/ChangePassword.dto';
import { SecretQuestionTokenDocument } from './schemas/SecretQuestionToken.schema';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(CipherServiceConfig.name)
    private readonly cipherService: ClientProxy,
    private readonly secretQuestionService: SecretQuestionService,
    private readonly secretQuestionTokenService: SecretQuestionTokenService,
  ) {}

  async create(data: CreateUserDTO) {
    const encryptedData = await this.cipherService
      .send<any, EncryptDataDto>('encrypt', {
        data,
        ignore: ['role', 'sex', 'tags'],
      })
      .toPromise();

    const foundUser = await this.userModel.findOne({
      emailHash: encryptedData.emailHash,
    });

    if (foundUser) {
      BadRequest('This email has already been registered');
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

  async getAccountByEmail(email: string): Promise<UserDocument> {
    const encrypted = await this.cipherService
      .send('encryptOne', email)
      .toPromise();

    return this.userModel.findOne({ emailHash: encrypted.hash });
  }

  async getAccountById(id: string) {
    return this.userModel.findById(id);
  }

  async recoverSecretQuestion(data: RecoverSecretQuestionDTO) {
    const encryptedAccount: UserDocument = await this.getAccountByEmail(
      data.email,
    );

    if (!encryptedAccount) {
      NotFound('account');
    }

    const encryptedSecretQuestion = await this.secretQuestionService.get(
      encryptedAccount._id,
    );

    const question: string = await this.cipherService
      .send('decryptOne', encryptedSecretQuestion.question)
      .toPromise();

    return { question };
  }

  async answerSecretQuestion(data: AnswerSecretQuestionDTO) {
    const { email } = data;
    const encryptedAccount: UserDocument = await this.getAccount({ email });

    if (!encryptedAccount) {
      NotFound('account');
    }

    const encryptedQuestion: SecretQuestionDocument =
      await this.secretQuestionService.get(encryptedAccount._id);

    const answer = await this.cipherService
      .send('encryptOne', data.answer)
      .toPromise();

    if (answer.hash !== encryptedQuestion.answerHash) {
      BadRequest('invalid answer');
    }

    const answerToken: string = uuidv4();

    await this.secretQuestionTokenService.create({
      token: answerToken,
      userId: encryptedAccount._id,
    });

    return { token: answerToken };
  }

  async updateAccount(account: any, param: any) {
    await this.userModel.updateOne(account, param);
  }

  async changePassword(data: ChangePasswordDTO) {
    const { password, token } = data;
    const secretQuestionToken: SecretQuestionTokenDocument =
      await this.secretQuestionTokenService.get(token);

    if (!secretQuestionToken) {
      Unauthorized('invalid token');
    }

    const encryptedPassword = await this.cipherService
      .send('encryptOne', password)
      .toPromise();

    this.updateAccount(
      { _id: secretQuestionToken.userId },
      { password: encryptedPassword.hash },
    );

    await this.secretQuestionTokenService.delete(secretQuestionToken);

    return { message: 'password successfully changed' };
  }
}
