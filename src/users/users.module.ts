import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, Usersstchema } from './schemas';
import { UserRepository } from './user.repository';

@Module({
    controllers: [UsersController],
    providers: [UsersService, UserRepository],
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: Usersstchema }]),
    ],
})
export class UsersModule {}
