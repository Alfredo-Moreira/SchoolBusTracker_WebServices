const request = require('supertest');
const mockingoose = require('mockingoose').default;
const app = require('../app');
const httpStatus = require('http-status-codes');

//Mock Data
const mockModel = require('../mocks/mock_models');

//mock Models
const mockAdmin = mockModel.adminModel;

//models
const adminModel = require('../models/admin_model');



describe('Models Suite of Tests',() =>{
    //Before and After each
    beforeEach(() => {
        mockingoose.resetAll();
      });
   
    test('Test the Admin Model',async()=>{
        return adminModel.create(mockAdmin).then(item => {
            expect(item.adminFirstName).toMatch(mockAdmin.adminFirstName);
            expect(item.adminLastName).toMatch(mockAdmin.adminLastName);
            expect(item.adminGender).toBe(mockAdmin.adminGender);
        })
    });
});

//Unauthorized Tests
describe('Unauthorized Suite of Tests', () => {

    //Before and After All
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
        });

      
    test('It should return 302 for redirect', async () => {
        const response = await request(server).post('/v1/authenticate-admin');
        expect(response.redirect).toBe(true);
        expect(response.statusCode).toBe(httpStatus.MOVED_TEMPORARILY);
        });

    test('It should return 401 for unauthorized',async () => {
        const response = await request(server).get('/v1/authenticate-admin/unauthorized');.
        expect(response.redirect).toBe(false);
        expect(response.statusCode).toBe(httpStatus.UNAUTHORIZED);
        expect(response.body.Status).toBe(httpStatus.UNAUTHORIZED);
        expect(response.body.Code).toBe(httpStatus.UNAUTHORIZED);
        expect(response.body.Message).toBe("Unauthorized User")
        });
    });

