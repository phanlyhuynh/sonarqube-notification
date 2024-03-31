const express = require('express');

const router = express.Router();
const sonarqubeController = require('../controllers/sonarqube.controller');
const { Project } = require('../models')

router.post('/webhook/:uuid', sonarqubeController.notify)

module.exports = router;
