import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/users/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, Usersstchema } from 'src/users/schemas';
import { JwtModule } from '@nestjs/jwt';
import {  ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    controllers: [AuthController],
    providers: [AuthService, UserRepository, JwtStrategy],
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: Usersstchema }]),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secretOrPrivateKey: configService.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: 3600,
                },
            }),
        }),
    ],
})
export class AuthModule {}
