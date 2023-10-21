import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todolist, TodolistDocument } from './schemas';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/database/entity.repository';
import { CreateTodolistDto } from './dto/create-todolist.dto';

@Injectable()
export class TodolistRepository extends EntityRepository<TodolistDocument> {
    constructor(
        @InjectModel(Todolist.name)
        private todolistModel: Model<TodolistDocument>,
    ) {
        super(todolistModel);
    }

    async create(createEntityData: CreateTodolistDto): Promise<any> {
        const todolist = await this.todolistModel.findOne({
            title: createEntityData.title,
        });
        
        if (todolist)
            throw new InternalServerErrorException(
                'this todolist already exist',
            );
        return this.todolistModel.create(createEntityData);
    }
}
