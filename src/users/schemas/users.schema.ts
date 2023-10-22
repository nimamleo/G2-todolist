import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Document & User>;

@Schema({ timestamps: true })
export class User {
    @Prop()
    username: string;

    @Prop()
    password: string;
}

export const Usersstchema = SchemaFactory.createForClass(User);
