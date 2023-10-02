import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dtos/create.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @ApiOperation({ description: 'Get all Clients.' })
  @Get()
  getAll() {
    return this.clientService.getAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ description: 'Create Clients' })
  @Post()
  create(@Body() clientDetails: CreateClientDto) {
    return this.clientService.create(clientDetails);
  }

  @ApiOperation({ description: 'Get the client details By Id.' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.clientService.getById(id);
  }

  @Put(':id')
  update() {}

  @Delete(':id')
  destroy() {}
}
