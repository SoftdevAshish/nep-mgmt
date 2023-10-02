import { SystemTypes } from '../../enum/systemtypes.enum';

export type CreateClientParam = {
  clientName: string;
  clientContractDate: Date;
  clientExpiryDate: Date;
  slug: string;
  active: boolean;
  systemType: SystemTypes;
  clientEmail: string;
  phone: string;
};
