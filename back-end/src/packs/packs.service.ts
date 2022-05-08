import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pack } from './pack.model';
import { Product } from '../products/product.model';


@Injectable()
export class PacksService {
  constructor(@InjectModel('Pack') private readonly packModel: Model<Pack>,@InjectModel('Product') private readonly productModel: Model<Product>) {}

  async insertPack(
    title: string,
    desc: string,
    price: number,
    image: string,
    products: Array<string>,
  ) {
    const newPack = new this.packModel({
      title,
      description: desc,
      price,
      image,
      products: products
    });

    const result = await newPack.save();
  

    return result.id as string;
  }

  async getPacks() {
    const Packs = await this.packModel.find().exec();
    return Packs.map((pack) => ({
      id: pack.id,
      title: pack.title,
      description: pack.description,
      price: pack.price,
      image: pack.image,
    }));
  }

  async getSinglePack(PackId: string) {
    const pack = await this.findPack(PackId);
    const products = pack.products.map(async (product)=>{
      const object = await this.productModel.findById(product).exec()
    })
    return {
      id: pack.id,
      title: pack.title,
      description: pack.description,
      price: pack.price,
      image: pack.image,
      products: products
    };
  }

  async updatePack(
    packId: string,
    title: string,
    desc: string,
    price: number,
    image: string,
    products: Array<string>
  ) {
    const updatedPack = await this.findPack(packId);
    if (title) {
      updatedPack.title = title;
    }
    if (desc) {
      updatedPack.description = desc;
    }
    if (price) {
      updatedPack.price = price;
    }
    if (image) {
      updatedPack.image = image;
    }
    if (products) {
      updatedPack.products = products;
    }
    updatedPack.save();
  }

  async deletePack(packId: string) {
    const result = await this.packModel.deleteOne({ _id: packId }).exec();
    if (result.deletedCount === 0 ) {
      throw new NotFoundException('Could not find Pack.');
    }
  }

  private async findPack(id: string): Promise<Pack> {
    let pack;
    try {
      pack = await this.packModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find Pack.');
    }

    if (!pack) {
      throw new NotFoundException('Could not find Pack.');
    }
    return pack;
  }
}
