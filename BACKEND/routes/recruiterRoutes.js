const express = require('express');
const router = express.Router();
const recruiterController = require('../controllers/recruiterController');
const { validateRecruiter } = require('../middleware/validation');

router.post('/', validateRecruiter, recruiterController.createRecruiter);






module.exports = router;
