import { Injectable } from '@nestjs/common';
import { CreateTodolistDto } from './dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto';
import { TodolistRepository } from './todolist.repository';

@Injectable()
export class TodolistService {
    constructor(private readonly todolistRepository: TodolistRepository) {}

    getOneTodolist(id: string) {
        return this.todolistRepository.findOne({ _id: id });
    }

    getAllTodolist() {
        return this.todolistRepository.find({});
    }

    createTodolist(createTodolistDto: CreateTodolistDto) {
        return this.todolistRepository.create(createTodolistDto);
    }

    updateTodolist(id: string, updateTodolistDto: UpdateTodolistDto) {
        console.log(updateTodolistDto);

        return this.todolistRepository.findOneAndUpdate(
            { _id: id },
            updateTodolistDto,
        );
    }

    removeOneTodolist(id: string) {
        return this.todolistRepository.deleteOne({ _id: id });
    }
}
