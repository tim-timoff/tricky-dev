import mongoose, { Document, Schema } from 'mongoose';

// Document interface
export interface Admin {
    id: number;
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    pass: string;
    emailConfirmed: boolean;
    emailConfirmationLik: string;
    nick: string;
    roles: [String];
}

export const AdminSchema = new Schema<Admin> ({
    id: {type: Number, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    name: {type: String},
    email: {type: String, required: true, unique: true, lowercase:true, trim: true},
    pass: {type: String, required: true},
    nick: {type: String, required: true},
    roles: {type: [String], default: []},
});