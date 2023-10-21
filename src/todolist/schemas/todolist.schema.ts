import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TodolistDocument = HydratedDocument<Document & Todolist>;

@Schema({ timestamps: true })
export class Todolist {
    @Prop()
    title: string;

    @Prop()
    description: string;
}

export const Todolistchema = SchemaFactory.createForClass(Todolist);
