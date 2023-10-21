import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
} from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { CreateTodolistDto } from './dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto';
import { CLIENT_RENEG_LIMIT } from 'tls';

@Controller('todolist')
export class TodolistController {
    constructor(private readonly todolistService: TodolistService) {}

    @Get(':id')
    getOneTodolist(@Param('id') id: string) {
        return this.todolistService.getOneTodolist(id);
    }

    @Get()
    getAllTodolist() {
        return this.todolistService.getAllTodolist();
    }

    @Post()
    createTodolist(@Body() createTodolistDto: CreateTodolistDto) {
        return this.todolistService.createTodolist(createTodolistDto);
    }

    @Patch(':id')
    updateTodolist(
        @Param('id') id: string,
        @Body() updateTodolistDto: UpdateTodolistDto,
    ) {
        return this.todolistService.updateTodolist(id, updateTodolistDto);
    }

    @Delete(':id')
    @HttpCode(204)
    removeOneTodolist(@Param('id') id: string) {
        return this.todolistService.removeOneTodolist(id);
    }
}
