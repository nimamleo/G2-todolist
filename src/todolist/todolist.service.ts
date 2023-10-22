import { Injectable } from '@nestjs/common';
import { CreateTodolistDto } from './dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto';
import { TodolistRepository } from './todolist.repository';
import { User } from 'src/users/schemas';

@Injectable()
export class TodolistService {
    constructor(private readonly todolistRepository: TodolistRepository) {}

    getOneTodolist(id: string, user: User) {
        return this.todolistRepository.findOne({ _id: id, owner: user._id });
    }

    getAllTodolist(user: User) {
        return this.todolistRepository.find({ owner: user._id });
    }

    createTodolist(createTodolistDto: CreateTodolistDto, user: User) {
        return this.todolistRepository.create(createTodolistDto, user);
    }

    updateTodolist(
        id: string,
        updateTodolistDto: UpdateTodolistDto,
        user: User,
    ) {
        console.log(updateTodolistDto);

        return this.todolistRepository.findOneAndUpdate(
            { _id: id, owner: user._id },
            updateTodolistDto,
        );
    }

    removeOneTodolist(id: string, user: User) {
        return this.todolistRepository.deleteOne({ _id: id, owner: user._id });
    }
}
