import { Message as PrismaMessageModel } from '@prisma/client';

export const messages: PrismaMessageModel[] = [
	{
		id: 1442123,
		messageID: 'a-sdasdasg-asdf',
		fromuser: 'Bret',
		content: 'Yinaal haolam ani bainternet!',
		createdat: '1637250393738',
		geolocation_lat: 46.811232,
		geolocation_lng: 8.323341,
	},
	{
		id: 1244212,
		messageID: 'asda-sdasga-sdf',
		fromuser: 'Bret',
		content: 'ignore my last message please! :D',
		createdat: '1637250393938',
		geolocation_lat: 46.811232,
		geolocation_lng: 8.323341,
	},
	{
		id: 124123,
		messageID: 'a-sda-sda-sga-sdf',
		fromuser: 'Antonette',
		content: '@Bret, is it all good?',
		createdat: '1637250494938',
		geolocation_lat: 47.012344,
		geolocation_lng: 8.911111,
	},
	{
		id: 12423,
		messageID: 'asda-sdas-gas3rgb-df',
		fromuser: 'Samantha',
		content: 'check out where i am!',
		createdat: '1637250393938',
		geolocation_lat: 47.3792555,
		geolocation_lng: 8.5412411,
	},
];
