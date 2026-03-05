function MessageBubble({ message, sender }) {
  return (
    <div style={{
      textAlign: sender === "user" ? "right" : "left",
      margin: "10px"
    }}>
      <span style={{
        background: sender === "user" ? "#007bff" : "#eee",
        color: sender === "user" ? "white" : "black",
        padding: "8px 12px",
        borderRadius: "10px",
        display: "inline-block"
      }}>
        {message}
      </span>
    </div>
  );
}

export default MessageBubble;