import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../api";

const socket = io(BASE_URL);

function Chat() {
  const { id: projectId } = useParams();

  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const userId = localStorage.getItem("userId");
  const bottomRef = useRef(null);

  // ✅ LOAD MESSAGES (FIXED HERE)
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/message/${projectId}`);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (projectId) {
      fetchMessages();
    }
  }, [projectId]);

  // ✅ SOCKET LISTENER
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      if (data.projectId === projectId) {
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [projectId]);

  // ✅ AUTO SCROLL
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ SEND MESSAGE
  const sendMessage = () => {
    if (!text.trim()) return;

    const msg = {
      projectId,
      senderId: userId,
      text,
    };

    socket.emit("sendMessage", msg);

    setMessages((prev) => [...prev, msg]);
    setText("");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">💬 Chat</h2>

      <div className="border h-64 overflow-y-scroll p-2 mb-2 bg-white rounded">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-2 ${
              m.senderId === userId ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-3 py-1 rounded ${
                m.senderId === userId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
            >
              {m.text}
            </span>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message..."
        className="border p-2 w-full rounded"
      />

      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white px-4 py-2 mt-2 w-full rounded"
      >
        Send
      </button>
    </div>
  );
}

export default Chat;