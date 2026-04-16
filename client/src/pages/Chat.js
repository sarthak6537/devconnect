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
  <div className="flex flex-col h-screen bg-gray-100">
    
    {/* HEADER */}
    <div className="bg-blue-500 text-white p-4 text-lg font-semibold">
      💬 Project Chat
    </div>

    {/* MESSAGES */}
    <div className="flex-1 overflow-y-scroll p-4">
      {messages.map((m, i) => (
        <div
          key={i}
          className={`flex mb-2 ${
            m.senderId === userId ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`px-4 py-2 rounded-xl max-w-xs ${
              m.senderId === userId
                ? "bg-blue-500 text-white"
                : "bg-white border"
            }`}
          >
            <p>{m.text}</p>

            {/* ✅ TIMESTAMP */}
            <p className="text-xs text-gray-200 mt-1 text-right">
              {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      ))}
      <div ref={bottomRef}></div>
    </div>

    {/* INPUT BOX */}
    <div className="p-3 bg-white flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border rounded-full px-4 py-2 outline-none"
      />

      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white px-4 py-2 rounded-full"
      >
        Send
      </button>
    </div>
  </div>
);
}

export default Chat;