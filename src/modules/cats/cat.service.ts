import { Injectable } from '@nestjs/common';
import { CatInterface } from './cat.interface';

@Injectable()
export class CatService {
  private cats: CatInterface[] = [];

  create(cat: CatInterface) {
    this.cats.push(cat);
  }

  findAll(): CatInterface[] {
    return this.cats;
  }
}
