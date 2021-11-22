import Mapper from 'src/utils/Mappers/Mapper';
import { User as PrismaUser } from '@prisma/client';

export default class UserMap extends Mapper<PrismaUser, UserDTO> {
  toDTO = (pUser: PrismaUser): UserDTO => ({ ...pUser });
}
