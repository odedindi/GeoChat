import app from '../app';
import request from 'supertest';
import { chat } from '../repositories/seeds';

describe('/getRooms', () => {
	it('Should return status code 200 and Rooms list', async () => {
		const res = await request(app).get('/getRooms');
		expect(res.statusCode).toEqual(200);
		expect(res.body.data).toEqual(Object.keys(chat.roomsDict));
	});
});
