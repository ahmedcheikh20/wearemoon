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

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
    @Body('image') prodImage: string,
  ) {
    if (!prodTitle || !prodDesc || !prodPrice || !prodImage) {
      throw new BadRequestException('need more data');
    }

    const generatedId = await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
      prodImage,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    return products;
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    if (!prodId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException(`${prodId} is not a valid id`);
    }
    return this.productsService.getSingleProduct(prodId);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
    @Body('image') prodImage: string,
  ) {
    if (!prodId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException(`${prodId} is not a valid id`);
    }

    if (!prodTitle && !prodDesc && !prodPrice && !prodImage) {
      throw new BadRequestException('need more data');
    }
    await this.productsService.updateProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
      prodImage,
    );
    return null;
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    if (!prodId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException(`${prodId} is not a valid id`);
    }
    await this.productsService.deleteProduct(prodId);
    return null;
  }
}
