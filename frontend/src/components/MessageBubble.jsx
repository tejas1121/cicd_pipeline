import ReactMarkdown from "react-markdown";

function MessageBubble({ message, sender }) {

  const messageClass =
    sender === "user" ? "message-user" : "message-bot";

  const bubbleClass =
    sender === "user" ? "bubble-user" : "bubble-bot";

  return (
    <div className={messageClass}>
      <div className={bubbleClass}>
        <ReactMarkdown>
          {message}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default MessageBubble;