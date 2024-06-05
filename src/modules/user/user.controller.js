const catchAsync = require("../../utiles/catchAsync");
const sendResponse = require("../../utiles/sendResponse");
const {allUsersService} = require("./user.service")

const allUsers = catchAsync(async(req, res, next)=>{
    const result = await allUsersService()

    sendResponse(res, {
        statusCode: 201,
        success:true,
        message:"Get all users successfully",
        data: result
    })
})

module.exports = {
    allUsers
}