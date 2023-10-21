import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todolist, TodolistDocument } from './schemas';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/database/entity.repository';

@Injectable()
export class TodolistRepository extends EntityRepository<TodolistDocument> {
    constructor(
        @InjectModel(Todolist.name) userModel: Model<TodolistDocument>,
    ) {
        super(userModel);
    }
}
