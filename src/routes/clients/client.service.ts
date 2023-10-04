import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { ClientParam } from './types/index.type';
import { errorMessage } from '../../utils/response';

@Injectable()
export class ClientService {
  constructor(
    @Inject('ClientRepo') private clientRepository: Repository<Client>,
  ) {}

  async getAll() {
    try {
      return this.clientRepository.find();
    } catch (e) {
      throw e;
    }
  }

  async create(clientDetails: ClientParam) {
    try {
      const clientSlug = await this.getBySlug(clientDetails.slug);
      if (clientSlug) {
        return errorMessage({
          reason: 'Duplicate Slug please check and try unique.',
          field: 'Check Slug Value',
          status: 409,
        });
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
    try {
      const client = await this.clientRepository.findOne({ where: { id } });
      if (!client) {
        return errorMessage({
          reason: 'Client Not Found!',
          field: 'Check and Verify Id First.',
          status: 404,
        });
      }
      return client;
    } catch (e) {
      throw e;
    }
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

  async update(id: number, clientDetails: ClientParam) {
    try {
      const client = await this.getById(id);
      if (client) {
        const clientSlug = await this.getBySlug(clientDetails.slug);
        console.log(clientSlug, 'Clientslug');
        if (clientSlug) {
          if (clientSlug.id !== client.id) {
            return errorMessage({
              reason: 'Duplicate Slug please check and try unique.',
              field: 'Check Slug Value',
              status: 409,
            });
          }
        } else {
          await this.clientRepository.update(id, clientDetails);
          return await this.getById(id);
        }
      }
    } catch (e) {
      throw e;
    }
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
