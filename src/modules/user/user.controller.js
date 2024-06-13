const catchAsync = require("../../utiles/catchAsync");
const sendResponse = require("../../utiles/sendResponse");
const {getMyUserListService, getMyProfileService, getSingleUserService} = require("./user.service")

const getMyUserList = catchAsync(async(req, res, next)=>{
    const userId = req.user._id
    const result = await getMyUserListService(userId)
    sendResponse(res, {
        statusCode: 201,
        success:true,
        message:"Get all users",
        data: result
    })
})

const getSingleUser = catchAsync(async(req, res, next)=>{
    const userId = req.params.id
    const result = await getSingleUserService(userId)
    sendResponse(res, {
        statusCode: 201,
        success:true,
        message:"Get single user",
        data: result
    })
})

const getMyProfile = catchAsync(async(req, res, next)=>{
    const userId = req.user._id
    const result = await getMyProfileService(userId)
    sendResponse(res, {
        statusCode: 201,
        success:true,
        message:"Get my profile",
        data: result
    })
})

module.exports = {
    getMyUserList,
    getSingleUser,
    getMyProfile,
}