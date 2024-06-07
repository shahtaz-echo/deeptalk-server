const catchAsync = require("../../utiles/catchAsync");
const sendResponse = require("../../utiles/sendResponse");
const {allUsersService, getMyProfileService} = require("./user.service")

const allUsers = catchAsync(async(req, res, next)=>{
    const result = await allUsersService()
    sendResponse(res, {
        statusCode: 201,
        success:true,
        message:"Get all users successfully",
        data: result
    })
})

const getMyProfile = catchAsync(async(req, res, next)=>{
    console.log("heat")
    const userId = req.user._id
    const result = await getMyProfileService(userId)
    sendResponse(res, {
        statusCode: 201,
        success:true,
        message:"Get my profile successfully",
        data: result
    })
})

module.exports = {
    allUsers,
    getMyProfile
}