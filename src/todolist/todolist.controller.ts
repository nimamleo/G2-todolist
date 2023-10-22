import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    UseGuards,
} from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { CreateTodolistDto } from './dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto';
import { User } from 'src/users/schemas';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { GetUser } from 'src/common/decorators/getUser.decorator';

@Controller('todolist')
@UseGuards(JwtAuthGuard)
export class TodolistController {
    constructor(private readonly todolistService: TodolistService) {}

    @Get(':id')
    async getOneTodolist(@Param('id') id: string, @GetUser() user: User) {
        const data = await this.todolistService.getOneTodolist(id, user);
        return {
            data,
            statusCode: 200,
        };
    }
    @Get()
    async getAllTodolist(@GetUser() user: User) {
        const data = await this.todolistService.getAllTodolist(user);
        return {
            data,
            statusCode: 200,
        };
    }

    @Post()
    async createTodolist(
        @Body() createTodolistDto: CreateTodolistDto,
        @GetUser() user: User,
    ) {
        const data = await this.todolistService.createTodolist(
            createTodolistDto,
            user,
        );
        return {
            data,
            statusCode: 201,
        };
    }

    @Patch(':id')
    async updateTodolist(
        @Param('id') id: string,
        @Body() updateTodolistDto: UpdateTodolistDto,
        @GetUser() user: User,
    ) {
        const data = await this.todolistService.updateTodolist(
            id,
            updateTodolistDto,
            user,
        );
        return {
            data,
            statusCode: 200,
        };
    }

    @Delete(':id')
    @HttpCode(204)
    async removeOneTodolist(@Param('id') id: string, @GetUser() user: User) {
        const data = await this.todolistService.removeOneTodolist(id, user);
        return {
            data,
            statusCode: 204,
        };
    }
}
