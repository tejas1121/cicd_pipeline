import { useState } from "react";

function ChatInput({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    onSend(message);
    setMessage("");
  };

  return (
    <div style={{ display: "flex", marginTop: "10px" }}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask something..."
        style={{ flex: 1, padding: "8px" }}
      />

      <button onClick={handleSend} style={{ padding: "8px 16px" }}>
        Send
      </button>
    </div>
  );
}

export default ChatInput;