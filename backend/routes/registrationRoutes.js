const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {registerForEvent} = require('../controllers/registrationController');

router.post("/",auth,registerForEvent);

module.exports = router;
