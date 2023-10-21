import { IsString, Length } from 'class-validator';

export class CreateTodolistDto {
    @IsString()
    @Length(3, 20)
    title: string;

    @IsString()
    @Length(3, 100)
    description: string;
}
