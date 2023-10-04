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
import { errorMessage, successMessage } from '../../utils/response';

@Controller('client')
@ApiTags('Clients')
@UseInterceptors(ClassSerializerInterceptor)
export class ClientController {
  constructor(private clientService: ClientService) {}

  @ApiOperation({ summary: 'All Client', description: 'Get all Clients.' })
  @Get()
  async getAll() {
    try {
      return successMessage({
        message: 'Get All Client Details.',
        data: await this.clientService.getAll(),
      });
    } catch (e) {
      throw e;
    }
  }

  @ApiOperation({ summary: 'Save Client', description: 'Save Clients Details' })
  @Post()
  async create(@Body() clientDetails: CreateClientDto) {
    try {
      return successMessage({
        message: 'Client Created Successful',
        data: await this.clientService.create(clientDetails),
      });
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
      return successMessage({
        data: await this.clientService.getById(id),
        message: 'Get Client By Id',
      });
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
        return successMessage({
          data: await this.clientService.getBySlug(slug),
          message: 'Get Client By Slug',
        });
      } else {
        return errorMessage({
          reason: 'Client Not Found',
          field: 'Check Your Slug',
          status: 404,
        });
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
    @Body() clientDetails: CreateClientDto,
  ) {
    try {
      return successMessage({
        message: 'Updated Client Details',
        data: await this.clientService.update(id, clientDetails),
      });
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
      return successMessage({
        message: 'Deleted Client Details',
        data: await this.clientService.destroy(id),
      });
    } catch (e) {
      throw e;
    }
  }
}
