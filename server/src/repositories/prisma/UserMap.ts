import Mapper from 'src/utils/Mapper';
import { User as PrismaUserModel } from '@prisma/client';

export default class UserMap extends Mapper<PrismaUserModel, UserDTO> {
	toDTO = (pUser: PrismaUserModel): UserDTO => ({ ...pUser });
}
