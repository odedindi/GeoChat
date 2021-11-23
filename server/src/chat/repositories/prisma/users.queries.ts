import { Injectable } from '@nestjs/common';
import log from 'src/config/logger';
import prisma from 'src/config/prisma.config';
import { Prisma, User as PrismaUser } from '@prisma/client';
import UserMap from 'src/utils/Mappers/userMap';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  private userMap = new UserMap();
  private handleError = async <T>(cb: Promise<T>, errMsg: string) =>
    cb.catch((e: Error) => {
      log.error(`${errMsg}: ${e}`);
      throw e;
    });

  public addUser = async (data: Prisma.UserCreateInput): Promise<UserDTO> => {
    const errMsg = 'Prisma User Repository addUser error';
    const prismaUser = await this.handleError(
      prisma.user.create({ data }),
      errMsg,
    );
    return this.userMap.toDTO(prismaUser);
  };

  public updateUser = async ({
    data,
    where,
  }: {
    data: Prisma.UserUpdateInput;
    where: Prisma.UserWhereUniqueInput;
  }): Promise<UserDTO> => {
    const errMsg = 'Prisma User Repository updateUser error';
    const prismaUser = await this.handleError(
      prisma.user.update({ data, where }),
      errMsg,
    );
    return this.userMap.toDTO(prismaUser);
  };
  public removeUser = async (
    where: Prisma.UserWhereUniqueInput,
  ): Promise<UserDTO> => {
    const errMsg = 'Prisma User Repository removeUser error';

    const prismaUser = await this.handleError(
      prisma.user.delete({ where }),
      errMsg,
    );
    return this.userMap.toDTO(prismaUser);
  };
  public getAllUsers = async (params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<UserDTO[]> => {
    const errMsg = 'Prisma User Repository getAllUsers error';
    const prismaUsers = await this.handleError(
      prisma.user.findMany({ ...params }),
      errMsg,
    );
    const users = this.userMap.toDTOArr(prismaUsers);
    log.info(`getAllUsers, number of users found: ${users.length} `);
    return users;
  };

  public getUser = async (
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<UserDTO[]> => {
    const errMsg = 'Prisma User Repository getUser error';
    const prismaUser = await this.handleError(
      prisma.user.findUnique({ where: userWhereUniqueInput }),
      errMsg,
    );
    if (prismaUser) {
      const matchUser = this.userMap.toDTO(prismaUser);
      return [matchUser];
    }
    return [] as UserDTO[];
  };

  public getUsersWithinRange = async (
    lat: number,
    lng: number,
    radius: number,
  ): Promise<UserDTO[]> => {
    const errMsg = 'Prisma User Repository find usersWithinRange error:';

    const query = Prisma.sql`
			SELECT
				*
			FROM
				"User"
			WHERE
				ST_DWithin(ST_MakePoint(geolocation_lat,geolocation_lng), ST_MakePoint(${lat}, ${lng})::geography, ${radius} * 1000)
		`;

    const prismaUsers = await this.handleError<PrismaUser[]>(
      prisma.$queryRaw(query),
      errMsg,
    );

    const users = this.userMap.toDTOArr(prismaUsers);
    log.info(`getUsersWithinRange: number of users found: ${users.length}`);
    return users;
  };
}
