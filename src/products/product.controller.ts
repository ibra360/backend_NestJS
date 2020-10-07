import {
  Controller,
  Get,
  Post,
  Body,

} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async addProduct(
    @Body('title') producTitle: string,
    @Body('description') productDescription: string,
    @Body('price') productPrice: number,
  ) {
    console.log(producTitle, productDescription, productPrice, 'Firsttt');
    const res = await this.productService.insertProduct(
      producTitle,
      productDescription,
      productPrice,
    );
    return { result: res };
  }

  @Get()
  async getAllProducts() {
    const product = await this.productService.getProducts();
    return product;
  }
}
