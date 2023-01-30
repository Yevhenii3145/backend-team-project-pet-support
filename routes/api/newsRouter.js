const express = require('express');
const { ctrlWrapper } = require('../../helpers');
const ctrl = require('../../controllers/news/getAllNews');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAllNews));

module.exports = router;
