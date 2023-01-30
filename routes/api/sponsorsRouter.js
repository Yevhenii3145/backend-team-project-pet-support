const express = require('express');
const { ctrlWrapper } = require('../../helpers');
const ctrl = require('../../controllers/sponsors/getAllSponsors');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAllSponsors));

module.exports = router;
