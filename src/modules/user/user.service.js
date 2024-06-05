const { ApiError } = require("../../utiles/errors");
const User = require("./user.model")

const allUsersService = async()=>{
    const users = await User.find().select("-password")
    if(!users){
        throw new ApiError(404, "User not found")
    }
    return users;
}

module.exports = {
    allUsersService
}