const { ApiError } = require("../../utiles/errors");
const User = require("./user.model")

const allUsersService = async()=>{
    const users = await User.find().select("-password")
    if(!users){
        throw new ApiError(404, "User not found")
    }
    return users;
}
const getMyProfileService = async(userId)=>{
    const user = await User.findById({userId})
    if(!user){
        throw new ApiError(404, "User not found")
    }
    return user;
}

module.exports = {
    allUsersService,
    getMyProfileService
}