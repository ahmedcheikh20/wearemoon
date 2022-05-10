import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  BadRequestException,
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
    @Body('products') products: Array<string>,
  ) {
    if (!packTitle || !packDesc || !packPrice || !packImage || !products) {
      throw new BadRequestException('need more data');
    }

    const generatedId = await this.packsService.insertPack(
      packTitle,
      packDesc,
      packPrice,
      packImage,
      products,
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
    if (!packId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException(`${packId} is not a valid id`);
    }
    return this.packsService.getSinglePack(packId);
  }

  @Patch(':id')
  async updatePack(
    @Param('id') packId: string,
    @Body('title') packTitle: string,
    @Body('description') packDesc: string,
    @Body('price') packPrice: number,
    @Body('image') packImage: string,
    @Body('products') packproducts: Array<string>,
  ) {
    if (!packId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException(`${packId} is not a valid id`);
    }
    if (!packTitle && !packDesc && !packPrice && !packImage) {
      throw new BadRequestException('need more data');
    }

    await this.packsService.updatePack(
      packId,
      packTitle,
      packDesc,
      packPrice,
      packImage,
      packproducts,
    );
    return null;
  }

  @Delete(':id')
  async removepack(@Param('id') packId: string) {
    if (!packId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException(`${packId} is not a valid id`);
    }
    const result = await this.packsService.deletePack(packId);
    return;
  }
}
