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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { errorMessage, successMessage } from '../../utils/responses';
import {UpdateClientDto} from "./dtos/update.dto";

@Controller('client')
@ApiTags('Clients')
@UseInterceptors(ClassSerializerInterceptor)
export class ClientController {
  constructor(private clientService: ClientService) {}

  @ApiOperation({ summary: 'All Client', description: 'Get all Clients.' })
  @Get()
  async getAll() {
    try {
      return successMessage(
        'Get All Client Details.',
        await this.clientService.getAll(),
      );
    } catch (e) {
      throw e;
    }
  }

  @ApiOperation({ summary: 'Save Client', description: 'Save Clients Details' })
  @Post()
  async create(@Body() clientDetails: CreateClientDto) {
    try {
      return successMessage(
        'Client Created Successful',
        await this.clientService.create(clientDetails),
      );
    } catch (e) {
      throw e;
    }
  }

  @ApiOperation({
    summary: 'Client Get By Id ',
    description: 'Get the client details By Id.',
  })
  @Get(':id')
  async getById(@Param('id') id: number) {
    try {
      return successMessage(
          'Get Client By Id',
          await this.clientService.getById(id),
      );
    } catch (e) {
      throw e;
    }
  }

  @ApiOperation({
    summary: 'Client Get By Slug ',
    description: 'Get the client details By Slug.',
  })
  @Get('slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    try {
      const slugData = await this.clientService.getBySlug(slug);
      if (slugData) {
        return successMessage(
          'Get Client By Slug',
          await this.clientService.getBySlug(slug),
        );
      } else {
        return errorMessage('Client Not Found', 'Check Your Slug', 404);
      }
    } catch (e) {
      throw e;
    }
  }

  @ApiOperation({
    summary: 'Update Client Details',
    description: 'Update client details',
  })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateClientDetails: UpdateClientDto,
  ) {
    try {
      return successMessage(
        'Updated Client Details',
        await this.clientService.update(id, updateClientDetails),
      );
    } catch (e) {
      throw e;
    }
  }

  @ApiOperation({
    summary: 'Delete Client ',
    description: 'Delete client details By id',
  })
  @Delete(':id')
  async destroy(@Param('id') id: number) {
    try {
      return successMessage(
        'Deleted Client Details',
        await this.clientService.destroy(id),
      );
    } catch (e) {
      throw e;
    }
  }
}
