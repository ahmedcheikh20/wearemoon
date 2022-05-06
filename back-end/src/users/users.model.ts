import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

export interface Users extends mongoose.Document {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
}
