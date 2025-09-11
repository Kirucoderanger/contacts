const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
let swaggerFile;
try {
  swaggerFile = require('../swagger-output.json');
} catch (err) {
  console.error("swagger-output.json not found or invalid. Please generate the file before starting the server.");
  swaggerFile = {};
}

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerFile));
//router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile));


module.exports = router;