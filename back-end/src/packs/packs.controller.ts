
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { PacksService } from './packs.service';

@Controller('packs')
export class PacksController {
  constructor(private readonly packsService: PacksService) {}

  @Post()
  async addPack(
    @Body('title') packTitle: string,
    @Body('description') packDesc: string,
    @Body('price') packPrice: number,
    @Body('image') packImage: string,
    @Body("products") products: Array<string>
  ) {
    const generatedId = await this.packsService.insertPack(
      packTitle,
      packDesc,
      packPrice,
      packImage,
      products
    );
    return { id: generatedId };
  }

  @Get()
  async getAllPacks() {
    const packs = await this.packsService.getPacks();
    return packs;
  }

  @Get(':id')
  getpack(@Param('id') packId: string) {
    return this.packsService.getSinglePack(packId);
  }

  @Patch(':id')
  async updatePack(
    @Param('id') packId: string,
    @Body('title') packTitle: string,
    @Body('description') packDesc: string,
    @Body('price') packPrice: number,
    @Body("image") packImage: string,
    @Body("products") packproducts: Array<string>
  ) {
    await this.packsService.updatePack(packId, packTitle, packDesc, packPrice, packImage,packproducts);
    return null;
  }

  
  @Delete(':id')
  async removepack(@Param('id') packId: string) {
      await this.packsService.deletePack(packId);
      return null;
  }
}