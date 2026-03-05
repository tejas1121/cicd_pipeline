import MessageBubble from "./MessageBubble";

function ChatWindow({ messages }) {
  return (
    <div style={{
      height: "400px",
      overflowY: "auto",
      border: "1px solid #ccc",
      padding: "10px"
    }}>
      {messages.map((msg, index) => (
        <MessageBubble
          key={index}
          message={msg.text}
          sender={msg.sender}
        />
      ))}
    </div>
  );
}

export default ChatWindow;