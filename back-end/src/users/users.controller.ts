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
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
var jwt = require("jsonwebtoken")

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

  @Post('login')
  async findOne(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    const user = await this.usersService.findOne(email);
  
    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    if (!await bcrypt.compare(password, user.password)) {
      throw new BadRequestException('invalid credentials');
    }

    const token = jwt.sign(
      { user_id: user.id },
     "wearemoon"
    )

    res.status(200).json({
      accessToken: token,
      role: user.role,
      user: `${user.first_name} ${user.last_name}`
    })
  }

  @Get(':id')
  login(@Body('email') email: string) {
    return this.usersService.findOne(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.usersService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
