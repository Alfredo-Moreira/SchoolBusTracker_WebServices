const models ={
    defaultAdmin:{
    adminFirstName: "Master",
    adminLastName: "Admin",
    adminGender: 1,
    adminEmail: "master@gmail.com",
    adminUsername: "master_admin",
    adminPassword: "master_password",
    adminSchoolId: 0,
    userRoleId: 0},

    adminModel:{
        adminFirstName: "Joe",
        adminLastName: "Automation",
        adminGender: 1,
        adminEmail: "test@gmail.com",
        adminUsername: "testUser012",
        adminPassword: "testuserpassword1",
        adminSchoolId: 0,
        userRoleId: 0
    },
    adminBadModel:{
        adminFirstName: 22,
        adminLastName: "Automation",
        adminGender: "eewwrwer",
        adminEmail: "test@gmail.com",
        adminUsername: 22,
        adminPassword: 22,
        adminSchoolId: 0,
        userRoleId: 0
    },
    defaultSchool:{
        schoolName:"Union Prep School",
        schoolAddress:"85 S Union, Lakewood CO 80228",
        schoolPhoneNumber:"3033355735"
    },
    schoolModel:{
        schoolName:"Jefferson Preparatory School",
        schoolAddress:"12425 W Union, Lakewood CO 80228",
        schoolPhoneNumber:"7208889090"
    },
    schoolBadModel:{
        schoolPhoneNumber:"7208889090234234234234234"
    },
    schoolModelSecond:{
        schoolName:"Jefferson Preparatory School",
        schoolAddress:"12425 W Union, Lakewood CO 80228",
        schoolPhoneNumber:"3038889090"
    }
}

module.exports = models;