import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { ClientParam } from './types/index.type';
import { InjectRepository } from '@nestjs/typeorm';
import { errorMessage } from '../../utils/responses';
import {CreateClientDto} from "./dtos/create.dto";
import {UpdateClientDto} from "./dtos/update.dto";

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
  ) {}

  async getAll() {
    try {
      return this.clientRepository.find();
    } catch (e) {
      throw e;
    }
  }

  async create(clientDetails: CreateClientDto) {
    try {
      const clientSlug = await this.getBySlug(clientDetails.slug);
      if (clientSlug) {
        return errorMessage(
          'Duplicate Slug please check and try unique.',
          'Check Slug Value',
          409,
        );
      } else {
        return await this.clientRepository.save(
          this.clientRepository.create(clientDetails),
        );
      }
    } catch (e) {
      throw e;
    }
  }

  async getById(id: number) {
    const client = await this.clientRepository.findOneOrFail(id);
    return client;
  }

  async getBySlug(slug: string) {
    try {
      const client = await this.clientRepository.findOne({ where: { slug } });
      if (!client) {
        return false;
      }
      return client;
    } catch (e) {
      throw e;
    }
  }

  //todo change
  async update(id: number, clientDetails: UpdateClientDto) {
      const gotClient = await this.clientRepository.findOneOrFail(id);
      const {clientName,clientContractDate,clientExpiryDate,slug,active,systemType,clientEmail,phone} = clientDetails;
      const query = await this.clientRepository.createQueryBuilder('client');
      const checkClient = query.
      where('slug:slug',{slug})
          .andWhere('id:id',{id})
          .getOneOrFail();


      gotClient.clientContractDate = clientContractDate;




  }

  async destroy(id: number) {
    try {
      const client = await this.getById(id);
      if (client) {
        await this.clientRepository.delete(id);
        return client;
      }
    } catch (e) {
      throw e;
    }
  }
}
