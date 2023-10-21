import { Injectable } from '@nestjs/common';
import { CreateTodolistDto } from './dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto';
import { TodolistRepository } from './todolist.repository';

@Injectable()
export class TodolistService {
    constructor(private readonly todolistRepository: TodolistRepository) {}

    getOneTodolist(id: string) {
        return this.todolistRepository.findOne({ id });
    }

    getAllTodolist() {
        return this.todolistRepository.find({});
    }

    createTodolist(createTodolistDto: CreateTodolistDto) {
        return this.todolistRepository.create(createTodolistDto);
    }

    updateTodolist(id: string, updateTodolistDto: UpdateTodolistDto) {
        console.log(updateTodolistDto);
        
        return this.todolistRepository.findByIdAndUpdate({id} , updateTodolistDto);
    }

    removeOneTodolist(id: string) {
        console.log({id});
        
        return this.todolistRepository.deleteOne({id});
    }
}
