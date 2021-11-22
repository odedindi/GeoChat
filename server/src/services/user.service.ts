import { Injectable } from '@nestjs/common';
import log from 'src/config/logger';
import { Prisma, User as PrismaUser } from '@prisma/client';
import { PrismaService } from './prisma.service';
import UserMap from 'src/utils/Mappers/userMap';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  private userMap = new UserMap();
  private handleError = async <T>(cb: Promise<T>, errMsg: string) =>
    cb.catch((e: Error) => {
      log.error(`${errMsg}: ${e}`);
      throw e;
    });

  public getUser = async (
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<UserDTO[]> => {
    const errMsg = 'Prisma User Repository getUser error';
    const prismaUser = await this.handleError(
      this.prisma.user.findUnique({ where: userWhereUniqueInput }),
      errMsg,
    );
    if (prismaUser) {
      const matchUser = this.userMap.toDTO(prismaUser);
      return [matchUser];
    }
    return [] as UserDTO[];
  };

  public addUser = async (
    data: Prisma.UserCreateInput,
  ): Promise<PrismaUser> => {
    const errMsg = 'Prisma User Repository addUser error';
    return this.handleError(this.prisma.user.create({ data }), errMsg);
  };

  public updateUser = async ({
    data,
    where,
  }: {
    data: Prisma.UserUpdateInput;
    where: Prisma.UserWhereUniqueInput;
  }): Promise<PrismaUser> => {
    const errMsg = 'Prisma User Repository updateUser error';
    return this.handleError(this.prisma.user.update({ data, where }), errMsg);
  };

  public removeUser = (
    where: Prisma.UserWhereUniqueInput,
  ): Promise<PrismaUser> => {
    const errMsg = 'Prisma User Repository removeUser error';
    return this.handleError(this.prisma.user.delete({ where }), errMsg);
  };

  public getAllUsers = async ({
    skip,
    take,
    cursor,
    where,
    orderBy,
  }: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<UserDTO[]> => {
    const errMsg = 'Prisma User Repository removeUser error';
    const prismaUsers = await this.handleError(
      this.prisma.user.findMany({ skip, take, cursor, where, orderBy }),
      errMsg,
    );

    const users = this.userMap.toDTOArr(prismaUsers);
    log.info(`getAllUsers, number of users found: ${users.length} `);
    return users;
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
      this.prisma.$queryRaw(query),
      errMsg,
    );

    const users = this.userMap.toDTOArr(prismaUsers);
    log.info(`getUsersWithinRange: number of users found: ${users.length}`);
    return users;
  };
}
