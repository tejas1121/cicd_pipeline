import { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import "./chatbot.css";

function App() {

  const initialChat = {
    id: Date.now(),
    messages: []
  };

  const [chats, setChats] = useState([initialChat]);
  const [currentChatId, setCurrentChatId] = useState(initialChat.id);

  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const createNewChat = () => {

    const newChat = {
      id: Date.now(),
      messages: []
    };

    setChats(prev => [...prev, newChat]);
    setCurrentChatId(newChat.id);
    setMessages([]);

  };

  const sendMessage = async (message) => {

    const userMessage = {
      role: "user",
      content: message
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setIsTyping(true);

    try {

      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: updatedMessages
        })
      });

      const data = await res.json();

      const fullReply = data.reply;

      setIsTyping(false);

      let streamedText = "";
      const chunkSize = 6;

      for (let i = 0; i < fullReply.length; i += chunkSize) {

        streamedText += fullReply.slice(i, i + chunkSize);

        setMessages(prev => {

          const updated = [...prev];
          const last = updated[updated.length - 1];

          if (last && last.role === "assistant-stream") {
            last.content = streamedText;
          } else {
            updated.push({
              role: "assistant-stream",
              content: streamedText
            });
          }

          return [...updated];

        });

        await new Promise(requestAnimationFrame);
      }

      setMessages(prev => {

        const updated = [...prev];
        const last = updated[updated.length - 1];

        if (last.role === "assistant-stream") {
          last.role = "assistant";
        }

        return [...updated];

      });

      setChats(prev =>
        prev.map(chat =>
          chat.id === currentChatId
            ? { ...chat, messages: [...updatedMessages] }
            : chat
        )
      );

    } catch (error) {

      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "AI error occurred" }
      ]);

      setIsTyping(false);

    }

  };

  return (

    <div className="app">

      <div className="sidebar">

        <h2>AI Chat</h2>

        <button className="new-chat" onClick={createNewChat}>
          + New Chat
        </button>

        <div className="chat-history">

          {chats.map(chat => (

            <div
              key={chat.id}
              className="chat-item"
              onClick={() => {
                setCurrentChatId(chat.id);
                setMessages(chat.messages);
              }}
            >
              {chat.messages.length > 0
                ? chat.messages[0].content.slice(0, 30)
                : "New Chat"}
            </div>

          ))}

        </div>

      </div>

      <div className="chat-container">

        <div className="chat-header">
          AI Chatbot
        </div>

        <ChatWindow
          messages={messages}
          isTyping={isTyping}
        />

        <ChatInput onSend={sendMessage} />

      </div>

    </div>

  );

}

export default App;