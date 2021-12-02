import { generate } from '../src/utils/generators';
import { PrismaClient, Prisma } from '@prisma/client';
import log from '../src/config/logger';

const seed = async (usersList: Prisma.UserCreateInput[]) => {
  log.info(`===> 🌱Seeding start🌱 <===`);
  usersList.forEach(async (user) => {
    const prismaUser = await prisma.user.create({ data: user });
    log.info(`User: ${prismaUser.id} successfully created`);
  });
  log.info('===> 🌱Seeding end🌱 <===');
};

const users: Prisma.UserCreateInput[] = [
  {
    username: 'Bret',
    avatar: generate.avatar(),
    socketID: generate.id(),
    preferedDistance: 40,
    userID: 'fe51k85',
    room: 'geoChat',
    beSeenBeyondRange: false,
    geolocation_lat: 46.811232,
    geolocation_lng: 8.323341,
    Message: {
      create: [
        {
          messageID: generate.id(),
          content: 'Yinaal haolam ani bainternet!',
          createdat: '1637250393738',
          geolocation_lat: 46.811232,
          geolocation_lng: 8.323341,
        },
        {
          messageID: generate.id(),
          content: 'ignore my last message please! :D',
          createdat: '1637250393938',
          geolocation_lat: 46.811232,
          geolocation_lng: 8.323341,
        },
      ],
    },
  },
  {
    username: 'Antonette',
    avatar: generate.avatar(),
    socketID: generate.id(),
    preferedDistance: 40,
    userID: 'fe5dk15',
    room: 'geoChat',
    beSeenBeyondRange: false,
    geolocation_lat: 47.012344,
    geolocation_lng: 8.911111,
    Message: {
      create: [
        {
          messageID: generate.id(),
          content: '@Bret, is it all good?',
          createdat: '1637250494938',
          geolocation_lat: 47.012344,
          geolocation_lng: 8.911111,
        },
      ],
    },
  },
  {
    username: 'Samantha',
    avatar: generate.avatar(),
    socketID: generate.id(),
    preferedDistance: 40,
    userID: 'fe51k2q',
    room: 'geoChat',
    beSeenBeyondRange: false,
    geolocation_lat: 50.023311,
    geolocation_lng: 9.000221,
    Message: {
      create: [
        {
          messageID: generate.id(),
          content: 'check out where i am!',
          createdat: '1637250393938',
          geolocation_lat: 47.3792555,
          geolocation_lng: 8.5412411,
        },
      ],
    },
  },
  {
    username: 'Karianne',
    avatar: generate.avatar(),
    socketID: generate.id(),
    preferedDistance: 40,
    userID: 'vew1281',
    room: 'geoChat',
    beSeenBeyondRange: false,
    geolocation_lat: 47.001132,
    geolocation_lng: 8.012311,
  },
  {
    username: 'Kamren',
    avatar: generate.avatar(),
    socketID: generate.id(),
    preferedDistance: 40,
    userID: 'aed1k11',
    room: 'geoChat',
    beSeenBeyondRange: false,
    geolocation_lat: 45.988821,
    geolocation_lng: 7.123312,
  },
  {
    username: 'Leopoldo_Corkery',
    avatar: generate.avatar(),
    socketID: generate.id(),
    preferedDistance: 40,
    userID: '12s1ka5',
    room: 'geoChat',
    beSeenBeyondRange: false,
    geolocation_lat: 44.123121,
    geolocation_lng: 7.071232,
  },
  {
    username: 'Elwyn.Skiles',
    avatar: generate.avatar(),
    socketID: generate.id(),
    preferedDistance: 40,
    userID: 're5bsa5',
    room: 'geoChat',
    beSeenBeyondRange: false,
    geolocation_lat: 48.290304,
    geolocation_lng: 7.064123,
  },
  {
    username: 'Maxime_Nienow',
    avatar: generate.avatar(),
    socketID: generate.id(),
    preferedDistance: 40,
    userID: 'ee51185',
    room: 'geoChat',
    beSeenBeyondRange: false,
    geolocation_lat: 47.444211,
    geolocation_lng: 9.522122,
  },
  {
    username: 'Delphine',
    avatar: generate.avatar(),
    socketID: generate.id(),
    preferedDistance: 40,
    userID: 'fx52kk5',
    room: 'geoChat',
    beSeenBeyondRange: false,
    geolocation_lat: 46.123132,
    geolocation_lng: 9.412121,
  },
  {
    username: 'Moriah.Stanton',
    avatar: generate.avatar(),
    socketID: generate.id(),
    preferedDistance: 40,
    userID: '1ee1k25',
    room: 'geoChat',
    beSeenBeyondRange: false,
    geolocation_lat: 48.123211,
    geolocation_lng: 8.290404,
  },
];

const prisma = new PrismaClient();

seed(users)
  .catch((err) => {
    log.error(err);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
