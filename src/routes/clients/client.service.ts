import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { ClientParam } from './types/index.type';

@Injectable()
export class ClientService {
  constructor(
    @Inject('ClientRepo') private clientRepository: Repository<Client>,
  ) {}

  getAll() {
    return this.clientRepository.find();
  }

  create(clientDetails: ClientParam) {
    return this.clientRepository.save(
      this.clientRepository.create(clientDetails),
    );
  }

  getById(id: number) {
    return this.clientRepository.findBy({ id });
  }

  async update(id: number, clientDetails: ClientParam) {
    const client = await this.clientRepository.find({
      where: { id },
    });
    if (client.length > 0) {
      const clientSlug = await this.clientRepository.find({
        where: { slug: clientDetails.slug },
      });

      if (clientSlug.length > 0 && clientSlug[0].id !== client[0].id) {
        throw new HttpException('Please Verify Your Client Details', 409);
      }
      return this.clientRepository.update(id, clientDetails);
    } else {
      throw new HttpException('Client Not Found', 404);
    }
  }

  destroy(id: number) {
    return this.clientRepository.delete(id);
  }
}
