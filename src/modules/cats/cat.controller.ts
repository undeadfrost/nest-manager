import { Controller, Get, Post, Put, Delete, Param, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from './create-cat.dto';
import { CatService } from './cat.service';
import { CatInterface } from './cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catService: CatService) {
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createCatDto: CreateCatDto) {
    return this.catService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<CatInterface[]> {
    return this.catService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
