import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly usersModel: Model<Users>,
  ) {}

  async create(
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    role: string,
  ) {
    const newUser = new this.usersModel({
      first_name,
      last_name,
      email,
      password,
      role,
    });

    const result = await newUser
      .save()
      .then((rst) => {
        return rst;
      })
      .catch((err) => {
        return 'Email exit';
      });

    return result;
  }

  findOne(email: string) {
    
    let user = this.usersModel
      .findOne({ email: email}).exec()
      
   return  user
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
