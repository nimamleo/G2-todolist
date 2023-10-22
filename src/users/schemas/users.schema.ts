import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Todolist } from 'src/todolist/schemas';

export type UserDocument = HydratedDocument<Document & User>;

@Schema({ timestamps: true })
export class User {
    _id: ObjectId;

    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop({
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Todolist',
        default: [],
    })
    todolists: Todolist[];
}

export const Usersstchema = SchemaFactory.createForClass(User);
