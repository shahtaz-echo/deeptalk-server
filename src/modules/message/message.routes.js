const express = require('express');
const auth = require('../../middlewears/authHandler');
const router = express.Router();

const {sendMessage, getMessages} = require('./message.controller');

router.get("/:id", auth(), getMessages)
router.post("/send/:id", auth(), sendMessage)

module.exports = router