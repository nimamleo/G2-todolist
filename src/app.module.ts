import { Module } from '@nestjs/common';
import { TodolistModule } from './todolist/todolist.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import * as Joi from 'joi';

@Module({
    imports: [
        TodolistModule,
        DatabaseModule,
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                MONGO_DB_URL: Joi.string(),
                JWT_SECRET: Joi.string(),
            }),
        }),
        UsersModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
