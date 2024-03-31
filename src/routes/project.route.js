const express = require('express');

const router = express.Router();
const { store, remove, getList } = require('../controllers/project.controller')

router.get('/', getList);

router.post('/projects/store', store);
router.post('/projects/delete/:id', remove);

module.exports = router;
