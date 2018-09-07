const request = require('supertest');
const app = require('../app');
const httpStatus = require('http-status-codes');

//Unauthorized Tests

describe('Test the root path', () => {
    test('It should return 302 for redirect', async () => {
        const response = await request(app).get('/');
        expect(response.redirect).toBe(true);
        expect(response.statusCode).toBe(httpStatus.MOVED_TEMPORARILY);
        })
    });

describe('Test Authenticate with no API Key', () => {
    test('It should return 302 for redirect', async () => {
        const response = await request(app).post('/v1/authenticate');
        expect(response.redirect).toBe(true);
        expect(response.statusCode).toBe(httpStatus.MOVED_TEMPORARILY);
        })
    });

describe('Test Unauthorized', () => {
    test('It should return 401 for unauthorized', async () => {
        const response = await request(app).get('/v1/authenticate/unauthorized');
        expect(response.redirect).toBe(false);
        expect(response.statusCode).toBe(httpStatus.UNAUTHORIZED);
        expect(response.body.Status).toBe(httpStatus.UNAUTHORIZED);
        expect(response.body.Code).toBe(httpStatus.UNAUTHORIZED);
        expect(response.body.Message).toBe("Unauthorized User")
        })
    });