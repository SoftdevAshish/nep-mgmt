import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { DatabaseModule } from '../../commons/database/database.module';
import { clientProviders } from './client.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ClientController],
  providers: [...clientProviders, ClientService],
})
export class ClientsModule {}
