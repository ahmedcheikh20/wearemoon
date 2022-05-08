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

  findOneByEmail(email: string) {
    
    let user = this.usersModel
      .findOne({ email: email}).exec()
      
   return  user
  }

  findOneByToken(refreshToken: string) {
    
    let user = this.usersModel
      .findOne({ refreshToken: refreshToken}).exec()
      
   return  user
  }


  async getUsers() {
    const users = await this.usersModel.find().exec();
    return users.map(user => ({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    }));
  }


  async updateUser(
    UserId:string, 
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    role: string
  ) {
    
    const updatedUser = await this.findUser(UserId);
    if (first_name) {
      updatedUser.first_name = first_name;
    }
    if (last_name) {
      updatedUser.last_name = last_name;
    }
    if (email) {
      updatedUser.email = email;
    }
    if (password){
      updatedUser.password = password
    }
    if (role){
      updatedUser.role = role
    }
    updatedUser.save();
  }

  async remove(id: string) {
    const result = await this.usersModel.deleteOne({_id:id}).exec()
  }

  private async findUser(id: string): Promise<Users> {
    let user;
    try {
      user = await this.usersModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }
}





