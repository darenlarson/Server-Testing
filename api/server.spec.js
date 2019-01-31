const request = require('supertest');

const db = require('../data/dbConfig');
const server = require('./server.js');

afterEach(async () => {
    await db('hobbits').truncate();
  });

// ----------    Tests    ----------
describe('server.js', () => {
    describe('GET to / endpoint', () => {
        it('should respond with status code 200 OK', async () => {
            let response = await request(server).get('/');

            expect(response.status).toBe(200);
        });

        it('should respond with JSON', async () => {
            let response = await request(server).get('/');

            expect(response.type).toMatch(/json/i);
        });

        it('should send back an object with an api key', async () => {
            const expected = { api: 'up' };

            let response = await request(server).get('/');

            expect(response.body).toEqual(expected);
        });
    });

    describe('POST to /hobbit endpoint', () => {
        it('should respond with status code 201', async () => {
            const body = { name: 'test name' };

            let response = await request(server).post('/hobbit').send(body);

            expect(response.body).toEqual({ message: `test name added` })
        });

        it('should respond with a status code 400', async () => {
            const body = {};

            let response = await request(server).post('/hobbit').send(body);

            expect(response.status).toBe(400);
        });
    });

    describe('DELETE to /hobbit/:id endpoint', () => {
        it('should respond with status code 200', async () => {
            const id = 1;
            const body = { name: 'test name' };

            let responsePost = await request(server).post('/hobbit').send(body);
            expect(responsePost.body).toEqual({ message: 'test name added' });
            
            let responseGet = await request(server).get('/hobbit')
            let expected = [{ id: 1, name: "test name" }]
            expect(responseGet.body).toEqual(expected);

            let responseDelete = await request(server).delete(`/hobbit/${id}`);
            expect(responseDelete.status).toBe(200);
            expect(responseDelete.body).toEqual({ message: '1 hobbit deleted' });
        });

        it('should respond with status code 404', async() => {
            const id = 100;

            let responseDelete = await request(server).delete(`/hobbit/${id}`);
            expect(responseDelete.status).toBe(404);
        })
    });
});