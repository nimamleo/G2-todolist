import { Module } from '@nestjs/common';
import { TodolistModule } from './todolist/todolist.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TodolistModule,
        DatabaseModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
