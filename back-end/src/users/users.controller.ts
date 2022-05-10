import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response, Request } from 'express';
import * as bcrypt from 'bcrypt';
var jwt = require('jsonwebtoken');

import * as dotenv from 'dotenv';
import { first } from 'rxjs';

dotenv.config();

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // REGISTER CONROLLER
  @Post('signup')
  async register(
    @Body('first_name') first_name: string,
    @Body('last_name') last_name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role') role: string,
    @Body('image') image: string,
    @Res() res: Response,
  ) {
    let saltOrRounds = 10;

    if (!first_name || !last_name || !email || !password || !role || !image) {
      throw new BadRequestException('need more data');
    }
    let hash = await bcrypt.hash(password, saltOrRounds);

    const result = await this.usersService.create(
      first_name,
      last_name,
      email,
      (password = hash),
      role,
      image,
    );

    result === 'Email exit'
      ? res.status(409).json("you can't create user")
      : res.status(200).json('user created');
  }

  // LOGIN CONTROLLER
  @Post('login')
  async findOne(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('invalid credentials');
    }

    // create JWTs
    const token = jwt.sign(
      { user_id: user.id },
      process.env.ACCES_TOKEN_SECRET,
      { expiresIn: '10s' },
    );

    const refreshToken = jwt.sign(
      { user_id: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' },
    );

    res.cookie('jwt', refreshToken, { httpOnly: true });

    res.status(200).json({
      accessToken: token,
      role: [user.role],
      user: `${user.first_name} ${user.last_name}`,
    });
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'success',
    };
  }

  //Get all users
  @Get('all')
  async GetUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @Patch(':id')
  async updateUsers(
    @Body('first_name') first_name: string,
    @Param('id') userId: string,
    @Body('last_name') last_name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role') role: string,
  ) {
    if (!first_name && !last_name && !email && !password && !role) {
      throw new BadRequestException('What to update?');
    }
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException(`${userId} is not a valid id`);
    }

    await this.usersService.updateUser(
      userId,
      first_name,
      last_name,
      email,
      password,
      role,
    );
    return null;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException(`${id} is not a valid id`);
    }
    return this.usersService.remove(id);
  }
}
