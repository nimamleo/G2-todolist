import { Module } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { TodolistController } from './todolist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Todolist, Todolistchema } from './schemas';
import { TodolistRepository } from './todolist.repository';
import { UserRepository } from 'src/users/user.repository';
import { User, Usersstchema } from '../users/schemas/users.schema';

@Module({
    controllers: [TodolistController],
    providers: [TodolistService, TodolistRepository, UserRepository],
    imports: [
        MongooseModule.forFeature([
            { name: Todolist.name, schema: Todolistchema },
            { name: User.name, schema: Usersstchema },
        ]),
    ],
})
export class TodolistModule {}
