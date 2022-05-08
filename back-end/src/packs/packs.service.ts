import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pack } from './pack.model';

@Injectable()
export class PacksService {
  constructor(
    @InjectModel('Pack') private readonly packModel: Model<Pack>,
  ) {}

  async insertPack(title: string, desc: string, price: number) {
    const newPack = new this.packModel({
      title,
      description: desc,
      price,
    });
    const result = await newPack.save();
    return result.id as string;
  }

  async getPacks() {
    const Packs = await this.packModel.find().exec();
    return Packs.map(pack => ({
      id: pack.id,
      title: pack.title,
      description: pack.description,
      price: pack.price,
    }));
  }

  async getSinglePack(PackId: string) {
    const pack = await this.findPack(PackId);
    return {
      id: pack.id,
      title: pack.title,
      description: pack.description,
      price: pack.price,
    };
  }

  async updatePack(
    packId: string,
    title: string,
    desc: string,
    price: number,
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
    updatedPack.save();
  }

  async deletePack(packId: string) {
    const result = await this.packModel.deleteOne({_id: packId}).exec();
    if (!result) {
      throw new NotFoundException('Could not find Pack.');
    }
  }

  private async findPack(id: string): Promise<Pack> {
    let Pack;
    try {
      Pack = await this.packModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find Pack.');
    }
    if (!Pack) {
      throw new NotFoundException('Could not find Pack.');
    }
    return Pack;
  }
}
