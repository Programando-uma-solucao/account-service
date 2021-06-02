import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';

import { CreateUserDTO } from './dtos/CreateUser.dto';
import { User, UserDocument, UserRoles } from './schemas/User.schema';
import { CipherServiceConfig } from 'src/config/microservices.config';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(CipherServiceConfig.name)
    private readonly cipherService: ClientProxy,
  ) {}

  async create(data: CreateUserDTO): Promise<User> {
    const encryptedData = await this.cipherService
      .send('encrypt', {
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

    return plainToClass(User, savedUser.toObject());
  }
}
