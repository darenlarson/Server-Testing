const request = require('supertest');

const server = require('./server.js');


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
        })
    });
});