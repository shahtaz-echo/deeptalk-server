const catchAsync = require("../../utiles/catchAsync")
const sendResponse = require("../../utiles/sendResponse")

const {sendMessageService, getMessagesService} = require("./message.service")

const sendMessage = catchAsync(async (req, res, next) => {
    const receiverId = req.params.id
    const senderId = req.user._id
    const result = await sendMessageService(req.body, senderId, receiverId)
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Message sent successfully",
        data: result
    })
})

const getMessages = catchAsync(async (req, res, next) => {
    const senderId = req.user._id
    const receiverId = req.params.id

    const result = await getMessagesService(senderId, receiverId)
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Message get successfully",
        data: result
    })
})

module.exports = {
    sendMessage,
    getMessages
}