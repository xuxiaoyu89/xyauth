const express = require('express');
const router = express.Router();

router.use(require('./login.js'));
router.use(require('./signup.js'));
router.use(require('./users.js'));
router.use(require('./user.js'));
router.use(require('./token.js'));
router.use(require('./file.js'));

module.exports = router;