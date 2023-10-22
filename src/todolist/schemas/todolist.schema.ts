import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId, Types } from 'mongoose';
import { User } from 'src/users/schemas';

export type TodolistDocument = HydratedDocument<Document & Todolist>;

@Schema({ timestamps: true })
export class Todolist {
    _id: ObjectId;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'  , required:true})
    owner: User;
}

export const Todolistchema = SchemaFactory.createForClass(Todolist);
