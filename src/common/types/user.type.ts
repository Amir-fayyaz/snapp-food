import { AddressEntity } from 'src/modules/users/entities/address.entity';

export type IUser = {
  id: number;
  first_name: string;
  last_name: string;
  mobile: string;
  email: string;
  invite_code: string;
  score: number;
  agent_id: number;
  createdAt: Date;
  updatedAt: Date;
  addressList: AddressEntity[];
};
