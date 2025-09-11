// routes/index.js
const router = require('express').Router();

router.use('/swagger', require('./swagger'));
router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.use('/contacts', require('./contactsRoute'));

module.exports = router;