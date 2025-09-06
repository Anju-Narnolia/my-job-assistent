import Chat from "../models/chat.js ";

// Save a new message
export const saveMessage = async (req, res) => {
  try {
    const { userId, content, role } = req.body;
    // "YYYY-MM-DD"
    const today = new Date().toISOString().split("T")[0]; 

    let chat = await Chat.findOne({ userId, date: today });

    if (!chat) {
      chat = new Chat({ userId, date: today, messages: [] });
    }

    chat.messages.push({ content, role });
    await chat.save();

    res.json({ success: true, chat });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//all chat dates
export const getChatDates = async (req, res) => {
  try {
    const { userId } = req.params;
    const chats = await Chat.find({ userId }).select("date -_id").sort({ date: -1 });
    const dates = chats.map(c => c.date);
    res.json({ success: true, dates });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//all messages of a specific date
export const getChatByDate = async (req, res) => {
  try {
    const { userId, date } = req.params;
    const chat = await Chat.findOne({ userId, date });
    if (!chat) {
      return res.json({ success: false, messages: [] });
    }
    res.json({ success: true, messages: chat.messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
