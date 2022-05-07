import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response, Request } from 'express';
import * as bcrypt from 'bcrypt';
var jwt = require('jsonwebtoken');

import * as dotenv from 'dotenv';

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
    @Res() res: Response,
  ) {
    let saltOrRounds = 10;

    let hash = await bcrypt.hash(password, saltOrRounds);

    const result = await this.usersService.create(
      first_name,
      last_name,
      email,
      (password = hash),
      role,
    );

    result === 'Email exit'
      ? res.status(409).json('email Taken')
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

    res.cookie('jwt', refreshToken, {httpOnly: true});

    res.status(200).json({
      accessToken: token,
      role: [user.role],
      user: `${user.first_name} ${user.last_name}`,
    });
  }


  @Post('logout')
    async logout(@Res({passthrough: true}) response: Response) {
        response.clearCookie('jwt');

        return {
            message: 'success'
        }
    }

  //Get all users
  @Patch('all')
  GetUsers(@Res() res: Response, @Req() req: Request) {
    
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
