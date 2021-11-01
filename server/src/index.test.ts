import app from './app';
import request from 'supertest';

describe('Server is running', () => {
	it('Should returns status code 201', async () => {
		const res = await request(app).get('/');

		expect(res.statusCode).toEqual(201);
	});
});
