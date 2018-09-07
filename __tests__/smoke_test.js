const request = require('supertest');
const app = require('../app');
const httpStatus = require('http-status-codes');


//Unauthorized Tests
describe('Unauthorized Suite of Tests', () => {

    beforeAll((done) => {
        server = app.listen(done)
        request.agent(server);
      });

      afterAll((done) => {
        server.close(done);
      });
      
    test('It should return 302 for redirect', async () => {
        const response = await request(server).get('/');
        expect(response.redirect).toBe(true);
        expect(response.statusCode).toBe(httpStatus.MOVED_TEMPORARILY);
        })

      
    test('It should return 302 for redirect', async () => {
        const response = await request(server).post('/v1/authenticate');
        expect(response.redirect).toBe(true);
        expect(response.statusCode).toBe(httpStatus.MOVED_TEMPORARILY);
        })

    test('It should return 401 for unauthorized',async () => {
        const response = await request(server).get('/v1/authenticate/unauthorized');
        expect(response.redirect).toBe(false);
        expect(response.statusCode).toBe(httpStatus.UNAUTHORIZED);
        expect(response.body.Status).toBe(httpStatus.UNAUTHORIZED);
        expect(response.body.Code).toBe(httpStatus.UNAUTHORIZED);
        expect(response.body.Message).toBe("Unauthorized User")
        })
    });

