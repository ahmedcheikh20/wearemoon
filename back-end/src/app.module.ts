import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { PacksModule } from './packs/packs.module';
import * as dotenv from "dotenv"

dotenv.config()


@Module({
  imports: [MongooseModule.forRoot(
    process.env.MONGODB_URL
    ), UsersModule, ProductsModule, PacksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
