import { Module } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { TodolistController } from './todolist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Todolist, Todolistchema } from './schemas';
import { TodolistRepository } from './todolist.repository';

@Module({
    controllers: [TodolistController],
    providers: [TodolistService , TodolistRepository],
    imports: [
        MongooseModule.forFeature([
            { name: Todolist.name, schema: Todolistchema },
        ]),
        
    ],
})
export class TodolistModule {}
