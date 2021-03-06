const models = {
    defaultAdmin: {
        adminFirstName: "Master",
        adminLastName: "Admin",
        adminGender: 1,
        adminEmail: "master@gmail.com",
        adminUsername: "master_admin",
        adminPassword: "master_password",
        adminSchoolId: 0,
        userRoleId: 0
    },

    adminModel: {
        adminFirstName: "Joe",
        adminLastName: "Automation",
        adminGender: 1,
        adminEmail: "test@gmail.com",
        adminUsername: "testUser012",
        adminPassword: "testuserpassword1",
        adminSchoolId: 0,
        userRoleId: 0
    },
    adminBadModel: {
        adminFirstName: 22,
        adminLastName: "Automation",
        adminGender: "eewwrwer",
        adminEmail: "test@gmail.com",
        adminUsername: 22,
        adminPassword: 22,
        adminSchoolId: 0,
        userRoleId: 0
    },
    defaultSchool: {
        schoolName: "Union Prep School",
        schoolAddress: "85 S Union, Lakewood CO 80228",
        schoolPhoneNumber: "3033355735"
    },
    schoolModel: {
        schoolName: "Jefferson Preparatory School",
        schoolAddress: "12425 W Union, Lakewood CO 80228",
        schoolPhoneNumber: "7208889090"
    },
    schoolBadModel: {
        schoolPhoneNumber: "7208889090234234234234234"
    },
    schoolModelSecond: {
        schoolName: "Jefferson Preparatory School",
        schoolAddress: "12425 W Union, Lakewood CO 80228",
        schoolPhoneNumber: "3038889090"
    },
    defaultParent: {
        parentFirstName: "James",
        parentLasttName: "Creek",
        parentEmail: "james@gmail.com",
        parentPhoneNumber: "7206687710",
        parentUsername: "username-james",
        parentPassword: "jamesPassword",
        parentChildId: [0],
        parentGender: 1
    },
    parentModelFirst: {
        parentFirstName: "Parent",
        parentLastName: "Automation",
        parentEmail: "parent@gmail.com",
        parentPhoneNumber: "7206687710",
        parentUsername: "username-parent",
        parentPassword: "parentPassword",
        parentChildId: [1],
        parentGender: 1
    },
    parentModelSecond: {
        parentFirstName: "Parent",
        parentLastName: "Automation II",
        parentEmail: "parent@gmail.com",
        parentPhoneNumber: "7206687712",
        parentUsername: "username-parent",
        parentPassword: "parentPassword",
        parentChildId: [1],
        parentGender: 1
    },
    parentBadModel: {
        parentFirstName: 2444,
        parentLasttName: "Automation",
        parentEmail: "parent@gmail.com",
        parentPhoneNumber: "7206687710",
        parentUsername: 22,
        parentPassword: 22,
        parentChildId: [0],
        parentGender: 1
    },
    defaultChild: {
        childFirstName: "Child",
        childLastName: "Last",
        childAge: 8,
        childGrade: 4,
        childGender: 1,
        childParentId: [1],
        childSchoolId: 0,
        childRouteId: 0,
        childBusStopId: 10
    },
    childModelFirst: {
        childFirstName: "Adam",
        childLastName: "James",
        childAge: 8,
        childGrade: 4,
        childGender: 1,
        childParentId: [1],
        childSchoolId: 0,
        childRouteId: 0,
        childBusStopId: 10
    },
    childModelSecond: {
        childFirstName: "Adam",
        childLastName: "James II",
        childAge: 8,
        childGrade: 4,
        childGender: 1,
        childParentId: [1],
        childSchoolId: 0,
        childRouteId: 0,
        childBusStopId: 10
    },
    childBadModel: {
        childFirstName: 444,
        childLastName: 444,
        childAge: "hello",
        childGrade: 4,
        childGender: 1,
        childParentId: [1],
        childSchoolId: 0,
        childRouteId: 0,
        childBusStopId: 10
    },
    defaultDriver: {
        driverFirstName: 'Thommas',
        driverLastName: 'James',
        driverEmail: 'tj@gmail.com',
        driverAddress: '85 S Union Blvd',
        driverPhoneNumber: '3033355735',
        driverUsername: 'username-thomas',
        driverPassword: 'thomasPassword',
        driverAge: 35,
        driverGender: 1,
        driverBusId: 0,
        driverSchoolId: 0,
        driverRouteId: 0,

    },
    DriverFirstModel: {
        driverFirstName: 'Tim',
        driverLastName: 'Darius',
        driverEmail: 'td@gmail.com',
        driverAddress: '85 S Union Blvd',
        driverPhoneNumber: '3033355735',
        driverUsername: 'username-tim',
        driverPassword: 'timPassword',
        driverAge: 35,
        driverGender: 1,
        driverBusId: 0,
        driverSchoolId: 0,
        driverRouteId: 0,

    },
    DriverBadModel: {
        driverFirstName: 4234234,
        driverLastName: 234234,
        driverEmail: 23423423423,
        driverAddress: '85 S Union Blvd',
        driverPhoneNumber: '3033355735',
        driverUsername: 'username-thomas',
        driverPassword: 'thomasPassword',
        driverAge: '33433',
        driverGender: 1,
        driverBusId: 0,
        driverSchoolId: 0,
        driverRouteId: 0,

    }
}

module.exports = models;