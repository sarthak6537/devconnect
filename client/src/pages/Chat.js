import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../api";

function Chat({ projectId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const res = await axios.get(`${BASE_URL}/message/${projectId}`);
    setMessages(res.data);
  };

  const sendMessage = async () => {
    await axios.post(`${BASE_URL}/message/send`, {
      projectId,
      senderId: userId,
      text
    });

    setText("");
    fetchMessages();
  };

  return (
    <div className="p-4">
      <h2>Chat</h2>

      <div className="h-64 overflow-y-scroll border p-2">
        {messages.map((m, i) => (
          <p key={i}>
            <b>{m.senderId === userId ? "Me" : "User"}:</b> {m.text}
          </p>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message..."
        className="border p-2 w-full mt-2"
      />

      <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 mt-2">
        Send
      </button>
    </div>
  );
}

export default Chat;