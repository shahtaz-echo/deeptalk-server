const express = require('express');
const auth = require('../../middlewears/authHandler');

const router = express.Router();

const {allUsers} = require('./user.controller')

router.get("/", auth(), allUsers);

module.exports = router