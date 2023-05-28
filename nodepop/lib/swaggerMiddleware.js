const swaggerJSDOC = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Nodepop API',
      version: '0.1',
      description: 'Ads API',
    },
  },
  apis: ['./routes/**/*.js'],
};

const specification = swaggerJSDOC(options);

module.exports = [swaggerUI.serve, swaggerUI.setup(specification)];
