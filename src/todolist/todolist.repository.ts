import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todolist, TodolistDocument } from './schemas';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { CreateTodolistDto } from './dto/create-todolist.dto';
import { User } from 'src/users/schemas';
import { UserRepository } from 'src/users/user.repository';

@Injectable()
export class TodolistRepository {
    constructor(
        @InjectModel(Todolist.name)
        private todolistModel: Model<TodolistDocument>,
        private readonly userRepository: UserRepository,
    ) {}

    async findOne(
        entityFilterQuery: FilterQuery<Todolist>,
        projection?: Record<string, unknown>,
    ): Promise<Todolist | null> {
        await this.checkIsExist(entityFilterQuery)
        return this.todolistModel
            .findOne(entityFilterQuery, {
                __v: 0,
                ...projection,
            })
            .exec();
    }

    async find(
        entityFilterQuery: FilterQuery<Todolist>,
    ): Promise<Todolist[] | null> {
        const todolists = await this.todolistModel.find(entityFilterQuery);
        return todolists;
    }

    async create(
        createEntityData: CreateTodolistDto,
        user: User,
    ): Promise<any> {
        const IstodolistExist = await this.todolistModel.findOne({
            title: createEntityData.title,
        });

        if (IstodolistExist)
            throw new InternalServerErrorException(
                'this todolist already exist',
            );

        const todolist = await this.todolistModel.create({
            ...createEntityData,
            owner: user._id,
        });
        await this.userRepository.findOneAndUpdate(
            { _id: user._id },
            { $push: { todolists: todolist } },
        );

        user.todolists.push(todolist.id);
        return todolist;
    }

    async findOneAndUpdate(
        entityFilterQuery: FilterQuery<Todolist>,
        updateEntityData: UpdateQuery<unknown>,
    ): Promise<Todolist | null> {
        await this.checkIsExist(entityFilterQuery);
        return this.todolistModel.findOneAndUpdate(
            entityFilterQuery,
            updateEntityData,
            {
                new: true,
            },
        );
    }

    async deleteOne(
        entityFilterQuery: FilterQuery<Todolist>,
    ): Promise<boolean> {
        await this.checkIsExist(entityFilterQuery);
        const deleteResult =
            await this.todolistModel.deleteOne(entityFilterQuery);
        return deleteResult.deletedCount >= 1;
    }

    async checkIsExist(query: FilterQuery<unknown>) {
        const res = await this.todolistModel.findOne(query);
        if (!res) throw new NotFoundException('data not found');
        return !!res;
    }
}
