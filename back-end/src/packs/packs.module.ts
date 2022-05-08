import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PacksController } from './packs.controller';
import { PacksService } from './packs.service';
import { PackSchema } from './pack.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Pack', schema: PackSchema }]),
  ],
  controllers: [PacksController],
  providers: [PacksService],
})
export class PacksModule {}
