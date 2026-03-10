const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');

const { validateCandidate } = require('../middleware/validation');

router.post('/', validateCandidate, candidateController.createCandidate);






module.exports = router;
