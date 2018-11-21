const supertest = require('supertest');
const app = require('../app');
jest.unmock('mongoose');
const httpStatus = require('http-status-codes');
const isDev = process.env.NODE_ENV == 'dev';
const mongoose = require('mongoose');

//Mock Data
const mockModel = require('../mocks/mock_models');

//mock Models
const masterAdmin = mockModel.defaultAdmin;
const mockAdmin = mockModel.adminModel;
const badmockAdmin = mockModel.adminBadModel;
const mockSchool = mockModel.schoolModel;

//models
const adminModel = require('../models/admin_model');
const schoolModel = require('../models/school_model');

//Token Var
var token = null;
//Functions js Files
const functionUtil = require('../helper-functions/functionsUtil');

describe('Environment Suite of tests', () => {
    test('Should failed when env not test and ', async () => {
        expect(process.env.NODE_ENV).toEqual('test');
        expect(isDev).toBe(false);
    });
});

describe('Models Suite of Tests', () => {

    afterAll((done) => {
        for (var i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove(function () {});
        }
        return done();
    });

    test('Test the Admin Model', async () => {
        await new adminModel(mockAdmin).save();
        const admin = await adminModel.findOne({
            adminFirstName: mockAdmin.adminFirstName
        });
        expect(admin.adminFirstName).toMatch(mockAdmin.adminFirstName);
        expect(admin.adminLastName).toMatch(mockAdmin.adminLastName);
        expect(admin.adminGender).toBe(mockAdmin.adminGender);
    })

    test('Test the School Model', async () => {
        await new schoolModel(mockSchool).save();
        const school = await schoolModel.findOne({
            schoolName: mockSchool.schoolName
        });
        expect(school.schoolName).toMatch(mockSchool.schoolName);
        expect(school.schoolAddress).toMatch(mockSchool.schoolAddress);
        expect(school.schoolPhoneNumber).toMatch(mockSchool.schoolPhoneNumber);
    });
});


//Unauthorized Tests
describe('Unauthorized Suite of Tests - Verify enpoints are protected', () => {

    test('It should return 302 for redirect', async () => {
        const response = await supertest(app).get('/');
        expect(response.redirect).toBe(true);
        expect(response.statusCode).toBe(httpStatus.MOVED_TEMPORARILY);
    });


    test('It should return 400 for bad supertest', async () => {
        const response = await supertest(app).post('/v1/authenticate-admin/login');
        expect(response.redirect).toBe(false);
        expect(response.statusCode).toBe(httpStatus.BAD_REQUEST);
    });

    test('It should return 401 for unauthorized', async () => {
        const response = await supertest(app).get('/v1/authenticate-admin/unauthorized');
        expect(response.redirect).toBe(false);
        expect(response.statusCode).toBe(httpStatus.UNAUTHORIZED);
        expect(response.body.Status).toBe(httpStatus.UNAUTHORIZED);
        expect(response.body.Code).toBe(httpStatus.UNAUTHORIZED);
        expect(response.body.Message).toBe("Unauthorized User")
    });

    test('Test /v1/admin/adminUser/add endpoint', async () => {
        var temp = new adminModel(mockAdmin);
        const response = await supertest(app).post('/v1/admin/adminUser/add')
        .send(temp);
        expect(response.statusCode).toBe(httpStatus.UNAUTHORIZED);
       
    });

    test('Test /v1/admin/adminUser/list endpoint returns all Admins added', async () => {
        const response = await supertest(app).get('/v1/admin/adminUser/list')
        expect(response.statusCode).toBe(httpStatus.UNAUTHORIZED);
       
    });

    test('Test /v1/admin/adminUser/id endpoint to get singular Admin', async () => {
        const response = await supertest(app).get('/v1/admin/adminUser/' + 5)
        expect(response.statusCode).toBe(httpStatus.UNAUTHORIZED);
       
    })

    test('Should wrong formated add mock admin user', async () => {
        var temp = new adminModel(badmockAdmin);
        const response = await supertest(app).post('/v1/admin/adminUser/add')
        .send(temp);
        expect(response.statusCode).toBe(httpStatus.UNAUTHORIZED); 
    });
});

describe('Testing Admin Endpoints', () => {

    var userID = null;

    beforeAll(async (done) => {
        await new adminModel(masterAdmin).save();
        return done();
    });
    afterAll((done) => {
        for (var i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove(function () {});
        }
        return done();
    });

    test('Test /v1/authenticate-admin/login endpoint', async () => {
        const creds = {
            username: masterAdmin.adminUsername,
            password: masterAdmin.adminPassword
        };
        const response = await supertest(app).post('/v1/authenticate-admin/login').send(creds)
        expect(response.status).toBe(httpStatus.OK);
        expect(response.statusCode).toBe(httpStatus.OK);

        //Get Token
        token = response.body.data.token;
    });

    test('Test /v1/authenticate-admin/login endpoint wrong creds', async () => {
        const creds = {
            username: masterAdmin.adminUsername,
            password: "password"
        };
        const response = await supertest(app).post('/v1/authenticate-admin/login').send(creds)
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
        expect(response.statusCode).toBe(httpStatus.UNAUTHORIZED);
    });

    test('Test /v1/admin/adminUser/add endpoint', async () => {
        var temp = new adminModel(mockAdmin);
        const response = await supertest(app).post('/v1/admin/adminUser/add')
            .set('Authorization', 'Bearer ' + token).send(temp);
        expect(response.status).toBe(httpStatus.OK);
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data).toBe("Data saved");
    });

    test('Test /v1/admin/adminUser/add endpoint actually added', async () => {
        const admin = await adminModel.findOne({
            adminFirstName: mockAdmin.adminFirstName
        });
        expect(admin.adminFirstName).toMatch(mockAdmin.adminFirstName);
        expect(admin.adminLastName).toMatch(mockAdmin.adminLastName);
        expect(admin.adminGender).toBe(mockAdmin.adminGender);
    });

    test('Test /v1/admin/adminUser/list endpoint returns all Admins added', async () => {
        const response = await supertest(app).get('/v1/admin/adminUser/list')
            .set('Authorization', 'Bearer ' + token)
        expect(response.status).toBe(httpStatus.OK);
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body.data.length).toEqual(2);

        //get Second Admin not master
        userID = response.body.data[1]._id;
    });

    test('Test /v1/admin/adminUser/id endpoint to get singular Admin', async () => {
        const response = await supertest(app).get('/v1/admin/adminUser/' + userID)
            .set('Authorization', 'Bearer ' + token)
        expect(response.status).toBe(httpStatus.OK);
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data.adminFirstName).toMatch(mockAdmin.adminFirstName);
        expect(response.body.data.adminLastName).toMatch(mockAdmin.adminLastName);
        expect(response.body.data.adminGender).toBe(mockAdmin.adminGender);
    })

    test('Should wrong formated add mock admin user', async () => {
        var temp = new adminModel(badmockAdmin);
        const response = await supertest(app).post('/v1/admin/adminUser/add')
            .set('Authorization', 'Bearer ' + token).send(temp);
        expect(response.status).toBe(httpStatus.BAD_REQUEST);
        expect(response.statusCode).toBe(httpStatus.BAD_REQUEST);
        expect(response.body.Message).toBe("Bad Request");
        expect(response.body.Data).toBe("Something went wrong, we apologize!")
    });

})


// describe('Unit Tests',() => {

//   test('Test Function Validate User - wrong user',async()=>{
//   const response = await functionUtil.validateAdminUser("username","password",(err,user)=>{
//       expect(user).toBe(false);
//   });
// })

// });