var data = [
	{
		'model': 'School',
		'documents': [
			{   '_id':0,
                'schoolName':'Jefferson Preparatory School',
                'schoolAddress':'12425 W Union, Lakewood CO 80228',
                'schoolPhoneNumber':'7208889090',
                'schoolBusRoutesTotal':10,
                'schoolChildTotalNumber':1500,
                'schoolDriversTotalNumber':15
			}
		]
    },
    {
        'model':'Admin',
        'documents':[
            {
                '_id':1,
                'adminFirstName': "Master",
                'adminLastName': "Admin",
                'adminGender': 1,
                'adminEmail': "master@gmail.com",
                'adminUsername': "master_admin",
                'adminPassword': "master_password",
                'adminSchoolId': 0,
                'userRoleId': 0
            }
        ]
    },
    {
        'model':'Parent',
        'documents':[
            {
            '_id':0,
            'parentFirstName':"James",
            'parentLasttName':"Creek",
            'parentEmail':"james@gmail.com",
            'parentPhoneNumber':"7206687710",
            'parentUsername':"username-james",
            'parentPassword':"jamesPassword",
            'parentChildId':[0],
            'parentGender':1
        }
        ]
    },
    {
        'model':'Driver',
        'documents':[
            {
            '_id':0,
            'driverFirstName':'Thommas',
            'driverLastName':'James',
            'driverEmail':'tj@gmail.com',
            'driverAddress':'85 S Union Blvd',
            'driverPhoneNumber':'3033355735',
            'driverUsername':'username-thomas',
            'driverPassword':'thomasPassword',
            'driverAge':35,
            'driverGender':1,
            'driverBusId':0,
            'driverSchoolId':0,
            'driverRouteId':0,
            }
        ]
    }
];

module.exports = data;