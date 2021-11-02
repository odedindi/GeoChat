import app from '../app';
import request from 'supertest';
import * as chat from '../services';

// app.get('/getRooms', (_req, res) => res.status(200).json({data: chat.rooms}))

describe('/getRooms', () => {
	it('Should return status code 200 and Rooms list', async () => {
		const res = await request(app).get('/getRooms');
		expect(res.statusCode).toEqual(200);
		expect(res.body.data).toEqual(chat.rooms);
	});
});
