import { User as PrismaUser } from '@prisma/client';
import Mapper from './Mapper';

export default class UserMap extends Mapper<PrismaUser, UserDTO> {
  toDTO = (pUser: PrismaUser): UserDTO => ({ ...pUser });
}
