const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'A simple CRUD API for managing contacts',
  },
  host: 'contacts-21ut.onrender.com',
  schemes: ['https'],
};
const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
