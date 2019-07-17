const supertest = require('supertest');
const app = require('../app');
jest.unmock('mongoose');
const httpStatus = require('http-status-codes');
const isDev = process.env.ENV == 'Development';
const isDebug = process.env.ENV == 'Debug';
const isProd = process.env.ENV == 'Production';

const mongoose = require('mongoose');

//Mock Data
const mockModel = require('../mocks/mock_models');

//models
const adminModel = require('../models/admin_model');
const schoolModel = require('../models/school_model');
const parentModel = require('../models/parent_model');
const childModel = require('../models/child_model');
const driverModel =  require('../models/driver_model');

describe('Environment Suite of tests', () => {
    test('Should failed when env not test and ', async () => {
        expect(process.env.ENV).toEqual('Test');
        expect(isDev).toBe(false);
        expect(isDebug).toBe(false);
        expect(isProd).toBe(false);
    });
});

describe('Test Render pages',()=>{
    test('Should test for version page', async()=>{
        const response = await supertest(app).get('/version');
        expect(response.statusCode).toBe(httpStatus.OK);
    });

    test('Should test for about page', async()=>{
        const response = await supertest(app).get('/about');
        expect(response.statusCode).toBe(httpStatus.OK);
    })

});

describe('Models Suite of Tests', () => {

    afterAll((done) => {
        for (var i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove(function () {});
        }
        return done();
    });

    test('Test the Admin Model', async () => {
        await new adminModel(mockModel.adminModel).save();
        const admin = await adminModel.findOne({
            adminFirstName: mockModel.adminModel.adminFirstName
        });
        expect(admin.adminFirstName).toMatch(mockModel.adminModel.adminFirstName);
        expect(admin.adminLastName).toMatch(mockModel.adminModel.adminLastName);
        expect(admin.adminGender).toBe(mockModel.adminModel.adminGender);
    });

    test('Test the School Model', async () => {
        await new schoolModel(mockModel.schoolModel).save();
        const school = await schoolModel.findOne({
            schoolName: mockModel.schoolModel.schoolName
        });
        expect(school.schoolName).toMatch(mockModel.schoolModel.schoolName);
        expect(school.schoolAddress).toMatch(mockModel.schoolModel.schoolAddress);
        expect(school.schoolPhoneNumber).toMatch(mockModel.schoolModel.schoolPhoneNumber);
    });

    test('Test the Parent Model',async()=>{
        await new parentModel(mockModel.parentModelFirst).save();
        const parent = await parentModel.findOne({
            parentFirstName: mockModel.parentModelFirst.parentFirstName
        });
        expect(parent.parentFirstName).toMatch(mockModel.parentModelFirst.parentFirstName);
        expect(parent.parentLastName).toMatch(mockModel.parentModelFirst.parentLastName);
        expect(parent.parentEmail).toMatch(mockModel.parentModelFirst.parentEmail);
        expect(parent.parentPhoneNumber).toMatch(mockModel.parentModelFirst.parentPhoneNumber);
    });

    test('Test the Child Model',async()=>{
        await new childModel(mockModel.defaultChild).save();
        const parent = await parentModel.findOne({
            parentFirstName: mockModel.parentModelFirst.parentFirstName
        });
        expect(parent.parentFirstName).toMatch(mockModel.parentModelFirst.parentFirstName);
        expect(parent.parentLastName).toMatch(mockModel.parentModelFirst.parentLastName);
        expect(parent.parentEmail).toMatch(mockModel.parentModelFirst.parentEmail);
        expect(parent.parentPhoneNumber).toMatch(mockModel.parentModelFirst.parentPhoneNumber);
    });
    test('Test the Driver Model',async()=>{
        await new driverModel(mockModel.DriverFirstModel).save();
        const driver = await driverModel.findOne({
            driverFirstName: mockModel.DriverFirstModel.driverFirstName
        });
        expect(driver.driverFirstName).toMatch(mockModel.DriverFirstModel.driverFirstName);
        expect(driver.driverLastName).toMatch(mockModel.DriverFirstModel.driverLastName);
        expect(driver.driverEmail).toMatch(mockModel.DriverFirstModel.driverEmail);
        expect(driver.driverPhoneNumber).toMatch(mockModel.DriverFirstModel.driverPhoneNumber);
    })
});


//Unauthorized Tests
describe('Unauthorized Suite of Tests - Verify enpoints are protected', () => {

    test('It should return 302 for redirect', async () => {
        const response = await supertest(app).get('/');
        expect(response.redirect).toBe(true);
        expect(response.statusCode).toBe(httpStatus.MOVED_TEMPORARILY);
    });


    test('It should return 400 for bad supertest', async () => {
        const response = await supertest(app).post('/v1/authenticate/admin/login');
        expect(response.redirect).toBe(false);
        expect(response.statusCode).toBe(httpStatus.BAD_REQUEST);
    });

    test('It should return 401 for unauthorized', async () => {
        const response = await supertest(app).get('/v1/authenticate/unauthorized');
        expect(response.redirect).toBe(false);
        expect(response.statusCode).toBe(httpStatus.UNAUTHORIZED);
        expect(response.body.Status).toBe(httpStatus.UNAUTHORIZED);
        expect(response.body.Code).toBe(httpStatus.UNAUTHORIZED);
        expect(response.body.Message).toBe("Unauthorized User")
    });

    test('Test /v1/admin/adminUser/add endpoint', async () => {
        var temp = new adminModel(mockModel.adminModel);
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
       
    });

    test('Test /v1/admin/adminUser/add - wrong formated payload', async () => {
        var temp = new adminModel(mockModel.adminBadModel);
        const response = await supertest(app).post('/v1/admin/adminUser/add')
        .send(temp);
        expect(response.statusCode).toBe(httpStatus.UNAUTHORIZED); 
    });

    test('Test /v1/parent/parentUser/add - wrong formated payload', async () => {
        var temp = new parentModel(mockModel.parentBadModel);
        const response = await supertest(app).post('/v1/parent/parentUser/add')
        .send(temp);
        expect(response.statusCode).toBe(httpStatus.UNAUTHORIZED); 
    });
});

describe('Testing Admin Endpoints', () => {

    var userID = null;

    beforeAll(async (done) => {
        await new adminModel(mockModel.defaultAdmin).save();
        return done();
    });
    afterAll((done) => {
        token = null;
        for (var i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove(function () {});
        }
        return done();
    });

    test('Test /v1/authenticate/admin/login endpoint', async () => {
        const creds = {
            username: mockModel.defaultAdmin.adminUsername,
            password: mockModel.defaultAdmin.adminPassword
        };
        const response = await supertest(app).post('/v1/authenticate/admin/login').send(creds)
        expect(response.status).toBe(httpStatus.OK);
        expect(response.statusCode).toBe(httpStatus.OK);

        //Get Token
        token = response.body.data.token;
    });

    test('Test /v1/authenticate/admin/login endpoint wrong creds', async () => {
        const creds = {
            username: mockModel.defaultAdmin.adminUsername,
            password: "password"
        };
        const response = await supertest(app).post('/v1/authenticate/admin/login').send(creds)
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
        expect(response.statusCode).toBe(httpStatus.UNAUTHORIZED);
    });

    test('Test /v1/authenticate/admin/login endpoint wrong creds - username', async () => {
        const creds = {
            username: 5555,
            password: "password"
        };
        const response = await supertest(app).post('/v1/authenticate/admin/login').send(creds)
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
        expect(response.statusCode).toBe(httpStatus.UNAUTHORIZED);
    });

    test('Test /v1/admin/adminUser/add endpoint', async () => {
        var temp = new adminModel(mockModel.adminModel);
        const response = await supertest(app).post('/v1/admin/adminUser/add')
            .set('Authorization', 'Bearer ' + token).send(temp);
        expect(response.status).toBe(httpStatus.OK);
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data).toBe("Data saved");
    });

    test('Test /v1/admin/adminUser/add endpoint actually added', async () => {
        const admin = await adminModel.findOne({
            adminFirstName: mockModel.adminModel.adminFirstName
        });
        expect(admin.adminFirstName).toMatch(mockModel.adminModel.adminFirstName);
        expect(admin.adminLastName).toMatch(mockModel.adminModel.adminLastName);
        expect(admin.adminGender).toBe(mockModel.adminModel.adminGender);
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
        expect(response.body.data.adminFirstName).toMatch(mockModel.adminModel.adminFirstName);
        expect(response.body.data.adminLastName).toMatch(mockModel.adminModel.adminLastName);
        expect(response.body.data.adminGender).toBe(mockModel.adminModel.adminGender);
    })

    test('Test /v1/admin/adminUser/add - wrong formatted payload', async () => {
        var temp = new adminModel(mockModel.adminBadModel);
        const response = await supertest(app).post('/v1/admin/adminUser/add')
            .set('Authorization', 'Bearer ' + token).send(temp);
        expect(response.status).toBe(httpStatus.BAD_REQUEST);
        expect(response.statusCode).toBe(httpStatus.BAD_REQUEST);
        expect(response.body.Message).toBe("Bad Request");
        expect(response.body.Data).toBe("Something went wrong, we apologize!")
    });

    test('Test /v1/admin/adminUser/:id endpoint',async()=>{
        const response = await supertest(app).delete('/v1/admin/adminUser/' + userID)
            .set('Authorization', 'Bearer ' + token);
            expect(response.status).toBe(httpStatus.OK);
            expect(response.statusCode).toBe(httpStatus.OK);
            expect(response.body.data).toBe("Data Deleted");
    });

    test('Test /v1/admin/adminUser/id endpoint to get singular Admin - Data should be non-existent ', async () => {
        const response = await supertest(app).get('/v1/admin/adminUser/' + userID)
            .set('Authorization', 'Bearer ' + token);
            expect(response.status).toBe(httpStatus.NOT_FOUND);
            expect(response.statusCode).toBe(httpStatus.NOT_FOUND);
            expect(response.body.Message).toBe("Not Found");
            expect(response.body.Data).toBe("Data not found");
    });
});

describe('Testing School Endpoints', () => {

    var schoolID = null;

    beforeAll(async (done) => {
        await new schoolModel(mockModel.defaultSchool).save();
        await new adminModel(mockModel.defaultAdmin).save();

        //Login and get Token
        const creds = {
            username: mockModel.defaultAdmin.adminUsername,
            password: mockModel.defaultAdmin.adminPassword
        };
        const response = await supertest(app).post('/v1/authenticate/admin/login').send(creds);
        token = response.body.data.token;
        return done();
    });
    afterAll((done) => {
        for (var i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove(function () {});
        }
        return done();
    });

    test('Test /v1/school/schoolObject/add endpoint',async()=>{
        const response =  await supertest(app).post('/v1/school/schoolObject/add')
        .set('Authorization', 'Bearer ' + token)
        .send(mockModel.schoolModel);
        expect(response.status).toBe(httpStatus.OK);
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data).toBe("Data saved");
        
    });
    test('Test /v1/school/schoolObject/add endpoint - bad formatted payload',async()=>{
        const response =  await supertest(app).post('/v1/school/schoolObject/add')
        .set('Authorization', 'Bearer ' + token)
        .send(mockModel.schoolBadModel);
        expect(response.status).toBe(httpStatus.BAD_REQUEST);
        expect(response.statusCode).toBe(httpStatus.BAD_REQUEST);
        expect(response.body.Message).toBe("Bad Request");
        expect(response.body.Data).toBe("Something went wrong, we apologize!")        
    });

    test('Test /v1/school/schoolObject/list endpoint',async()=>{
        const response =  await supertest(app).get('/v1/school/schoolObject/list')
        .set('Authorization', 'Bearer ' + token)
        expect(response.status).toBe(httpStatus.OK);
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body.data.length).toEqual(2);

        //Get SchoolID
        schoolID = response.body.data[1]._id;
    });

    test('Test /v1/school/schoolObject/:id Update endpoint',async()=>{
        const response =  await supertest(app).put('/v1/school/schoolObject/'+schoolID)
        .set('Authorization', 'Bearer ' + token)
        .send(mockModel.schoolModelSecond)
         expect(response.status).toBe(httpStatus.OK);
         expect(response.statusCode).toBe(httpStatus.OK);
         expect(response.body.data).toBe("Data Updated")
        });


    test('Test /v1/school/schoolObject/:id endpoint',async()=>{
        const response =  await supertest(app).get('/v1/school/schoolObject/'+schoolID)
        .set('Authorization', 'Bearer ' + token)
        expect(response.status).toBe(httpStatus.OK);
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data.schoolName).toMatch(mockModel.schoolModel.schoolName);
        expect(response.body.data.schoolAddress).toMatch(mockModel.schoolModel.schoolAddress);
        expect(response.body.data.schoolPhoneNumber).toMatch(mockModel.schoolModel.schoolPhoneNumber);

    })

    test('Test /v1/school/schoolObject/delete/:id endpoint',async()=>{
        const response =  await supertest(app).delete('/v1/school/schoolObject/delete/'+schoolID)
        .set('Authorization', 'Bearer ' + token)
        expect(response.status).toBe(httpStatus.OK);
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data).toBe("Data Deleted");
    });

    test('Test /v1/school/schoolObject/id endpoint to get singular School - Data should be non-existent ', async () => {
        const response = await supertest(app).get('/v1/school/schoolObject/' + schoolID)
            .set('Authorization', 'Bearer ' + token);
            expect(response.status).toBe(httpStatus.NOT_FOUND);
            expect(response.statusCode).toBe(httpStatus.NOT_FOUND);
            expect(response.body.Message).toBe("Not Found");
            expect(response.body.Data).toBe("Data not found");
    });

});

describe('Testing Parent Endpoints',()=>{
    var userID = null;

    beforeAll(async (done) => {
        await new parentModel(mockModel.defaultParent).save();
        await new adminModel(mockModel.defaultAdmin).save();

        //login and get Admin token
        const creds = {
            username: mockModel.defaultAdmin.adminUsername,
            password: mockModel.defaultAdmin.adminPassword
        };
        const response = await supertest(app).post('/v1/authenticate/admin/login').send(creds)
        expect(response.status).toBe(httpStatus.OK);
        expect(response.statusCode).toBe(httpStatus.OK);

        //Get Token
        tokenAdmin = response.body.data.token;

        return done();
    });
    afterAll((done) => {
        tokenParent = null;
        for (var i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove(function () {});
        }
        return done();
    });

    test('Test /v1/authenticate/parent/login endpoint', async () => {
        const creds = {
            username: mockModel.defaultParent.parentUsername,
            password: mockModel.defaultParent.parentPassword
        };
        const response = await supertest(app).post('/v1/authenticate/parent/login').send(creds)
        expect(response.status).toBe(httpStatus.OK);
        expect(response.statusCode).toBe(httpStatus.OK);

        //Get Token
        tokenParent = response.body.data.token;
    });

    test('Test /v1/authenticate/parent/login endpoint wrong creds', async () => {
        const creds = {
            username: mockModel.defaultParent.parentUsername,
            password: "password"
        };
        const response = await supertest(app).post('/v1/authenticate/parent/login').send(creds)
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
        expect(response.statusCode).toBe(httpStatus.UNAUTHORIZED);
    });


    test('Test /v1/authenticate/parent/login endpoint wrong creds', async () => {
        const creds = {
            username: 2223,
            password: "password"
        };
        const response = await supertest(app).post('/v1/authenticate/parent/login').send(creds)
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
        expect(response.statusCode).toBe(httpStatus.UNAUTHORIZED);
    });

    test('Test /v1/parent/parentUser/add endpoint', async () => {
        var temp = new parentModel(mockModel.parentModelFirst);
        const response = await supertest(app).post('/v1/parent/parentUser/add')
            .set('Authorization', 'Bearer ' + tokenAdmin).send(temp);
        expect(response.status).toBe(httpStatus.OK);
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data).toBe("Data saved");
    });

    test('Test /v1/parent/parentUser/add endpoint actually added', async () => {
        const parent = await parentModel.findOne({
            parentFirstName: mockModel.parentModelFirst.parentFirstName
        });
        expect(parent.parentFirstName).toMatch(mockModel.parentModelFirst.parentFirstName);
        expect(parent.parentLastName).toMatch(mockModel.parentModelFirst.parentLastName);
        expect(parent.parentGender).toBe(mockModel.parentModelFirst.parentGender);
    });

    test('Test /v1/parent/parentUser/list endpoint returns all parents added', async () => {
        const response = await supertest(app).get('/v1/parent/parentUser/list')
            .set('Authorization', 'Bearer ' + tokenAdmin)
        expect(response.status).toBe(httpStatus.OK);
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body.data.length).toEqual(2);

        //get Second parent not master
        userID = response.body.data[1]._id;
    });

    test('Test /v1/parent/parentUser/id endpoint to get singular parent', async () => {
        const response = await supertest(app).get('/v1/parent/parentUser/' + userID)
            .set('Authorization', 'Bearer ' + tokenParent)
        expect(response.status).toBe(httpStatus.OK);
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data.parentFirstName).toMatch(mockModel.parentModelFirst.parentFirstName);
        expect(response.body.data.parentLastName).toMatch(mockModel.parentModelFirst.parentLastName);
        expect(response.body.data.parentGender).toBe(mockModel.parentModelFirst.parentGender);
    })

    test('Test /v1/parent/parentUser/add - wrong formatted payload', async () => {
        var temp = new parentModel({});
        const response = await supertest(app).post('/v1/parent/parentUser/add')
            .set('Authorization', 'Bearer ' + tokenAdmin).send(temp);
        expect(response.status).toBe(httpStatus.BAD_REQUEST);
        expect(response.statusCode).toBe(httpStatus.BAD_REQUEST);
        expect(response.body.Message).toBe("Bad Request");
        expect(response.body.Data).toBe("Something went wrong, we apologize!")
    });
    test('Test /v1/parent/parentUser/:id update Parent', async () => {
        var temp = new parentModel(mockModel.childModelSecond);
        const response = await supertest(app).put('/v1/parent/parentUser/'+userID)
            .set('Authorization', 'Bearer ' + tokenAdmin).send(temp);
            expect(response.status).toBe(httpStatus.OK);
            expect(response.statusCode).toBe(httpStatus.OK);
            expect(response.body.data).toBe("Data Updated");
    });

    test('Test /v1/parent/parentUser/delete/:id endpoint',async()=>{
        const response = await supertest(app).delete('/v1/parent/parentUser/delete/' + userID)
            .set('Authorization', 'Bearer ' + tokenParent);
            expect(response.status).toBe(httpStatus.OK);
            expect(response.statusCode).toBe(httpStatus.OK);
            expect(response.body.data).toBe("Data Deleted");
    });

    test('Test /v1/parent/parentUser/id endpoint to get singular parent - Data should be non-existent ', async () => {
        const response = await supertest(app).get('/v1/parent/parentUser/' + userID)
            .set('Authorization', 'Bearer ' + tokenParent);
            expect(response.status).toBe(httpStatus.NOT_FOUND);
            expect(response.statusCode).toBe(httpStatus.NOT_FOUND);
            expect(response.body.Message).toBe("Not Found");
            expect(response.body.Data).toBe("Data not found");

    });
})

describe('Testing Child endpoints',()=>{
    var userID = null;

    beforeAll(async (done) => {
        await new parentModel(mockModel.defaultParent).save();
        await new adminModel(mockModel.defaultAdmin).save();

        //Login Parent token
        const Parentscreds = {
            username: mockModel.defaultParent.parentUsername,
            password: mockModel.defaultParent.parentPassword
        };
        const ParentResponse = await supertest(app).post('/v1/authenticate/parent/login').send(Parentscreds);
        tokenParent = ParentResponse.body.data.token;

        //Login Admin token
        const Admincreds = {
            username: mockModel.defaultAdmin.adminUsername,
            password: mockModel.defaultAdmin.adminPassword
        };
        const AdminResponse = await supertest(app).post('/v1/authenticate/admin/login').send(Admincreds);
        tokenAdmin = AdminResponse.body.data.token;

        return done();
    });
    afterAll((done) => {
        tokenParent = null;
        for (var i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove(function () {});
        }
        return done();
    });

    test('Test /v1/child/ChildUser/add endpoint actually adds', async() =>{
        const temp =  new childModel(mockModel.childModelFirst);
        const response = await supertest(app).post('/v1/child/childUser/add')
        .set('Authorization', 'Bearer ' + tokenAdmin).send(temp);
        expect(response.status).toBe(httpStatus.OK);
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data).toBe("Data saved");
    });

    test('Test /v1/child/ChildUser/add wrong payload actually adds', async() =>{
        const temp =  new childModel(mockModel.childBadModel);
        const response = await supertest(app).post('/v1/child/childUser/add')
        .set('Authorization', 'Bearer ' + tokenAdmin).send(temp);
        expect(response.status).toBe(httpStatus.BAD_REQUEST);
        expect(response.statusCode).toBe(httpStatus.BAD_REQUEST);
        expect(response.body.Message).toBe("Bad Request");
        expect(response.body.Data).toBe("Something went wrong, we apologize!")  
    });

    test('test /v1/child/childUser/list get list of child objects', async()=>{
        const response = await supertest(app).get('/v1/child/childUser/list')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        expect(response.status).toBe(httpStatus.OK);
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body.data.length).toEqual(1);

         //get Second child
         userID = response.body.data[0]._id;
    });

    test('test /v1/child/childUser/:id get Child ID based on Admin token', async()=>{
        const response = await supertest(app).get('/v1/child/childUser/' + userID)
        .set('Authorization', 'Bearer ' + tokenAdmin);
        expect(response.status).toBe(httpStatus.OK);
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data.childFirstName).toMatch(mockModel.childModelFirst.childFirstName);
        expect(response.body.data.childLastName).toMatch(mockModel.childModelFirst.childLastName);
        expect(response.body.data.childAge).toBe(mockModel.childModelFirst.childAge);

    });


    test('test /v1/child/childUser/:id get Child ID based on Parent token', async()=>{
        const response = await supertest(app).get('/v1/child/childUser/' + userID)
        .set('Authorization', 'Bearer ' + tokenParent);
        expect(response.status).toBe(httpStatus.OK);
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data.childFirstName).toMatch(mockModel.childModelFirst.childFirstName);
        expect(response.body.data.childLastName).toMatch(mockModel.childModelFirst.childLastName);
        expect(response.body.data.childAge).toBe(mockModel.childModelFirst.childAge);

    });

    test('test /v1/child/childUser/:id get Child ID based on Parent token', async()=>{
        const response = await supertest(app).get('/v1/child/childUser/' + userID)
        .set('Authorization', 'Bearer ' + tokenParent);
        expect(response.status).toBe(httpStatus.OK);
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data.childFirstName).toMatch(mockModel.childModelFirst.childFirstName);
        expect(response.body.data.childLastName).toMatch(mockModel.childModelFirst.childLastName);
        expect(response.body.data.childAge).toBe(mockModel.childModelFirst.childAge);

    });

    test('test /v1/child/childUser/:id update Child', async()=>{
        const temp = new childModel(mockModel.childModelSecond);
        const response = await supertest(app).put('/v1/child/childUser/' + userID)
        .set('Authorization', 'Bearer ' + tokenAdmin).send(temp);
        expect(response.status).toBe(httpStatus.OK);
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data).toBe("Data Updated");
    });

    test('test /v1/child/childUser/delete/:id delete Child', async()=>{
        const response = await supertest(app).delete('/v1/child/childUser/delete/' + userID)
        .set('Authorization', 'Bearer ' + tokenAdmin);
        expect(response.status).toBe(httpStatus.OK);
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data).toBe("Data Deleted");
    });
})

    describe('Testing Driver endpoints',()=>{
        var userID = null;
    
        beforeAll(async (done) => {
            await new adminModel(mockModel.defaultAdmin).save();
            await new driverModel(mockModel.defaultDriver).save();
    
            //Login Driver token
            const DriverCreds = {
                username: mockModel.defaultDriver.driverUsername,
                password: mockModel.defaultDriver.driverPassword
            };
            const DriverResponse = await supertest(app).post('/v1/authenticate/driver/login').send(DriverCreds);
            tokenDriver = DriverResponse.body.data.token;
    
            //Login Admin token
            const Admincreds = {
                username: mockModel.defaultAdmin.adminUsername,
                password: mockModel.defaultAdmin.adminPassword
            };
            const AdminResponse = await supertest(app).post('/v1/authenticate/admin/login').send(Admincreds);
            tokenAdmin = AdminResponse.body.data.token;
    
            return done();
        });
        afterAll((done) => {
            tokenDriver = null;
            for (var i in mongoose.connection.collections) {
                mongoose.connection.collections[i].remove(function () {});
            }
            return done();
        });


    test('Test /v1/driver/driverUser/add endpoint actually adds', async() =>{
        const temp =  new driverModel(mockModel.DriverFirstModel);
        const response = await supertest(app).post('/v1/driver/driverUser/add')
        .set('Authorization', 'Bearer ' + tokenAdmin).send(temp);
        expect(response.status).toBe(httpStatus.OK);
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data).toBe("Data saved");
    });
    
});