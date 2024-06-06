const express = require('express');
const auth = require('../../middlewears/authHandler');

const router = express.Router();

const {allUsers, getMyProfile} = require('./user.controller')

router.get("/", auth(), allUsers);
router.get("/my-profile", auth(), getMyProfile);

module.exports = router