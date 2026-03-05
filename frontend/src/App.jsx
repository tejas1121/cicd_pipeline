import { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";

function App() {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (message) => {

    const userMessage = { text: message, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    // Call backend API
    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await res.json();

    const botMessage = { text: data.reply, sender: "bot" };

    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <div style={{ width: "600px", margin: "50px auto" }}>
      <h2>AI Chatbot</h2>

      <ChatWindow messages={messages} />

      <ChatInput onSend={sendMessage} />
    </div>
  );
}

export default App;