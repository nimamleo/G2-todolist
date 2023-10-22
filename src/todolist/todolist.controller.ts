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
import { CLIENT_RENEG_LIMIT } from 'tls';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/utils/getUser.decorator';
import { User } from 'src/users/schemas';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('todolist')
export class TodolistController {
    constructor(private readonly todolistService: TodolistService) {}

    @Get(':id')
    getOneTodolist(@Param('id') id: string) {
        return this.todolistService.getOneTodolist(id);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    getAllTodolist(@GetUser() user: User) {
        console.log(user);

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
