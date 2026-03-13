import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

function ChatWindow({ messages, isTyping }) {

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (

    <div className="chat-window">

      {messages.map((msg, index) => (

        <MessageBubble
          key={index}
          message={msg.content}
          sender={msg.role === "user" ? "user" : "bot"}
        />

      ))}

      {isTyping && (
        <MessageBubble
          message="AI is thinking..."
          sender="bot"
        />
      )}

      <div ref={bottomRef}></div>

    </div>

  );
}

export default ChatWindow;