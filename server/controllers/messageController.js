import asyncHandler from "express-async-handler";
import { Message } from "../models/messageModel.js";
import { Chat } from "../models/chatModel.js";
import { User } from "../models/userModel.js";

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Error from message controller");
    return res.status(404).json({
      Message: "Request body is incomplete",
    });
  }

  var newMessage = {
    sender: req.user._id.toString(),
    content: content,
    chat: chatId,
  };

  console.log(newMessage);

  try {
    var message = await Message.create(newMessage);
    console.log(`Message created is ${message}`);
    message = await message.populate("sender", "name");
    // message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    console.log("Final message is " + message);
    res.json(message);
  } catch (error) {
    console.log("Here");
    res.status(400);
    throw new Error(error.message);
  }
});

const allMessage = asyncHandler(async (req, res) => {
  try {
    console.log(req.params.chatId);
    console.log(req.user._id.toString());
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name email")
      .populate("chat");
    console.log(messages);
    res.json(messages);
  } catch (error) {
    console.log(error);
  }
});

export { sendMessage, allMessage };
