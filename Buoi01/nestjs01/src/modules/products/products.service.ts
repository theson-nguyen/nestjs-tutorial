import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
@Injectable()
export class ProductsService {
  private products: any[];
  constructor() {
    const filePath = join(
      process.cwd(),
      'src',
      'modules',
      'products',
      'data',
      'products.json',
    );
    const fileData = readFileSync(filePath, 'utf-8');
    this.products = JSON.parse(fileData);
  }
  create(body: any) {
    const newProduct = {
      id: body.id,
      name: body.name,
      price: body.price,
      description: body.description,
    };
    this.products = [...this.products, newProduct];
    return this.products;
  }

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find((product: any) => product.id == id);
  }

  update(id: number, body: any) {
    const product = this.findOne(id);
    if (!product) return 'Invalid id';
    product.name = body.name;
    product.price = body.price;
    product.description = body.description;
    return this.products;
  }

  remove(id: string) {
    const index = this.products.findIndex((product) => product.id == id);

    if (index !== -1) {
      this.products.splice(index, 1);
    }
    return this.products;
  }
}
