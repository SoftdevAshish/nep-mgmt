import { SystemTypes } from '../../enum/systemtypes.enum';

export type ClientParam = {
  clientName: string;
  clientContractDate: Date;
  clientExpiryDate: Date;
  slug: string;
  active: boolean;
  systemType: SystemTypes;
  clientEmail: string;
  phone: string;
};
