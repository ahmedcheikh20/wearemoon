import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  first_name: { type: String, required: [true, 'first name is required'] },
  last_name: { type: String, required: [true, 'last name is required'] },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: [true, 'is required'],
  },
  password: { type: String, required: [true, 'password is required'] },
  role: { type: String, required: [true, 'role is required'] },

});

export interface Users extends mongoose.Document {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
}
