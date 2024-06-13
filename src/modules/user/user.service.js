const mongoose  = require("mongoose");
const { ApiError } = require("../../utiles/errors");
const User = require("./user.model")

const getMyUserListService = async (userId) => {
    const userObjId = new mongoose.Types.ObjectId(userId)
    const usersWithLastMessage = await User.aggregate([
      { $match: { _id: { $ne: userObjId } } },
      {
        $lookup: {
          from: "messages",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $or: [
                    { $and: [{ $eq: ["$senderId", userObjId] }, { $eq: ["$receiverId", "$$userId"] }] },
                    { $and: [{ $eq: ["$receiverId", userObjId] }, { $eq: ["$senderId", "$$userId"] }] }
                  ]
                }
              }
            },
            { $sort: { createdAt: -1 } },
            { $limit: 1 }
          ],
          as: "lastMessage"
        }
      },
      { $unwind: { path: "$lastMessage", preserveNullAndEmptyArrays: true } },
      { $project: { password: 0 } } 
    ]);
  
    if (!usersWithLastMessage) {
      throw new ApiError(404, "Users not found");
    }
    return usersWithLastMessage;
   
};

const getMyProfileService = async(userId)=>{
    const user = await User.findById(userId)
    if(!user){
        throw new ApiError(404, "User not found")
    }
    return user;
}

const getSingleUserService = async(userId)=>{
    const user = await User.findById(userId).select("-password")
    if(!user){
        throw new ApiError(404, "User not found")
    }
    return user;
}

module.exports = {
    getMyUserListService,
    getMyProfileService,
    getSingleUserService,
}