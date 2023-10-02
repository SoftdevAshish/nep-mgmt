import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientParam } from './types/index.type';

@Injectable()
export class ClientService {
  constructor(
    @Inject('ClientRepo') private userRepository: Repository<Client>,
  ) {}

  getAll() {
    return this.userRepository.find();
  }

  create(clientDetails: CreateClientParam) {
    return this.userRepository.save(this.userRepository.create(clientDetails));
  }

  getById(id: number) {
    return this.userRepository.findBy({ id });
  }

  update() {}

  destroy() {}
}
