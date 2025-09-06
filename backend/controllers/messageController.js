import Chat from "../models/chat.js";
//text controller  ai chat msg
export const testMsgController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { chatId, prompt } = req.body;
    const chat = await Chat.findeOne({ userId, _id: chatId });
    chat.message.push({ role: "user", content: prompt, timestamp: Date.now});
  } catch (error) {}
};
