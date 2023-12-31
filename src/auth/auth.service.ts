import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserRepository } from 'src/users/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) {}
    async signinLocal(username: string, password: string) {
        const user = await this.userRepository.findOne({ username });
        if (!user)
            throw new InternalServerErrorException('credential not valid');
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword)
            throw new InternalServerErrorException('credential not valid');
        const token =await this.signUser(user._id, user.username, 'user');
        return {token}
    }

    async signupLocal(dto: CreateAuthDto) {
        const isUserExist = await this.userRepository.findOne({
            username: dto.username,
        });

        if (isUserExist)
            throw new InternalServerErrorException('user already exist');
        const user = this.userRepository.create(dto);
        return user;
    }

    async signUser(userId: ObjectId, username: string, type: string) {
        return this.jwtService.sign({
            sub: userId,
            username,
            type,
        });
    }
}
