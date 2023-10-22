import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/database/entity.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';

@Injectable()
export class UserRepository extends EntityRepository<UserDocument> {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
    ) {
        super(userModel);
    }

    async create(createEntityData: CreateUserDto): Promise<any> {
        const user = await this.userModel.findOne({
            username: createEntityData.username,
        });

        if (user)
            throw new InternalServerErrorException('this user already exist');

        const password =await  bcrypt.hash(createEntityData.password, 10);
        console.log(password);

        return this.userModel.create({  ...createEntityData  , password})
    }
}
