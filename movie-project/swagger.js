const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'User/Movies API',
    description: 'User/Movies API',
  },
  host: 'localhost:5000',
  schemes: ['http'],
};
const outputFile = './swagger.json';
const endpointsFiles = [
  './routes/index.js'
];
 
// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);