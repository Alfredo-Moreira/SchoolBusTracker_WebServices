var mock = require('../mocks/mock_models');
var data = [
	{
		'model': 'School',
		'documents': [
			mock.defaultSchool
		]
    },
    {
        'model':'Admin',
        'documents':[
            mock.defaultAdmin
        ]
    },
    {
        'model':'Parent',
        'documents':[
            mock.defaultParent
        ]
    },
    
    {
        'model':'Driver',
        'documents':[
            mock.defaultDriver
        ]
    },
    {
        'model':'Child',
        'documents':[
            mock.defaultChild
        ]
    },
];

module.exports = data;