const express = require('express');
const auth = require('../../middlewears/authHandler');

const router = express.Router();

const {getMyUserList, getMyProfile, getSingleUser} = require('./user.controller')

router.get("/", auth(), getMyUserList);
router.get("/self-details", auth(), getMyProfile);
router.get("/:id", auth(), getSingleUser);

module.exports = router