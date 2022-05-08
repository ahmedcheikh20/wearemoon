import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PacksController } from './packs.controller';
import { PacksService } from './packs.service';
import { PackSchema } from './pack.model';
import { ProductSchema } from '../products/product.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Pack', schema: PackSchema },{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [PacksController],
  providers: [PacksService],
})
export class PacksModule {}
