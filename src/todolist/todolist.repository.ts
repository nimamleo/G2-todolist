import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todolist, TodolistDocument } from './schemas';
import { FilterQuery, Model } from 'mongoose';
import { EntityRepository } from 'src/database/entity.repository';

@Injectable()
export class TodolistRepository extends EntityRepository<TodolistDocument> {
    constructor(
        @InjectModel(Todolist.name)
        private todolistModel: Model<TodolistDocument>,
    ) {
        super(todolistModel);
    }
}
