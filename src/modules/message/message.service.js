const Conversation = require('../conversation/conversation.model')
const Message = require('./message.model')

const sendMessageService = async(payload, senderId, receiverId)=>{
    const {message} = payload;

    let conversation = await Conversation.findOne({ participants: {$all:[senderId, receiverId]}})

    if(!conversation){
        conversation = await Conversation.create({
            participants: [senderId, receiverId]
        })
    }

    const newMessage = new Message({
        senderId, receiverId, message
    })

    if(newMessage){
        conversation.messages.push(newMessage._id)
    }

    await Promise.all([conversation.save(), newMessage.save()])
    
    return newMessage;
}

const getMessagesService = async(senderId, receiverId)=>{

    let conversation = await Conversation.findOne({ 
        participants: {$all:[senderId, receiverId]}
    }).populate("messages")

    if(!conversation){
        return []
    }

    return conversation.messages;
}

module.exports = {
    sendMessageService,
    getMessagesService
}