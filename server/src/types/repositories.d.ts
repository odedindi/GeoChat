interface MessageRepository {
  addMessage: (data: Prisma.MessageCreateInput) => Promise<MessageDTO>;
  removeMessage: (where: Prisma.MessageWhereUniqueInput) => Promise<MessageDTO>;
  getAllMessages: (params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MessageWhereUniqueInput;
    where?: Prisma.MessageWhereInput;
    orderBy?: Prisma.MessageOrderByWithRelationInput;
  }) => Promise<MessageDTO[]>;
  getMessagesWithinRange: (
    lat: number,
    lng: number,
    radius: number,
  ) => Promise<MessageDTO[]>;
}

interface UserRepository {
  addUser: (data: Prisma.UserCreateInput) => Promise<UserDTO>;
  updateUser: (params: {
    data: Prisma.UserUpdateInput;
    where: Prisma.UserWhereUniqueInput;
  }) => Promise<UserDTO>;
  removeUser: (where: Prisma.UserWhereUniqueInput) => Promise<UserDTO>;
  getUser: (
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ) => Promise<UserDTO[]>;
  getAllUsers: (params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }) => Promise<UserDTO[]>;
  getUsersWithinRange: (
    lat: number,
    lng: number,
    radius: number,
  ) => Promise<UserDTO[]>;
}
