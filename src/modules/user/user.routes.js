const express = require('express');
const auth = require('../../middlewears/authHandler');

const router = express.Router();

const {allUsers, getMyProfile} = require('./user.controller')

router.get("/", auth(), allUsers);
router.get("/self-details", auth(), getMyProfile);

module.exports = router