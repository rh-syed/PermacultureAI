import React, { useState } from "react";

function ChatInterface() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      const userMessage = { type: "user", text: input };
      setMessages([...messages, userMessage]);

      // Send message to the backend
      fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      })
        .then((response) => response.json())
        .then((data) => {
          const botMessage = { type: "bot", text: data.reply };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        })
        .catch((error) => {
          console.error("Error sending message:", error);
          const errorMessage = {
            type: "bot",
            text: "There was an error processing your request. Please try again later.",
          };
          setMessages((prevMessages) => [...prevMessages, errorMessage]);
        });

      setInput("");
    }
  };

  return (
    <div className="chat-interface flex flex-col max-w-md mx-auto mt-10 border rounded-md shadow-lg">
      <div className="chat-messages flex-grow overflow-y-auto p-4 bg-gray-100">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message mb-2 ${
              msg.type === "user"
                ? "text-blue-500 text-right"
                : "text-green-500 text-left"
            }`}
          >
            <span className="inline-block p-2 rounded-md bg-white shadow-md">
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="chat-input flex p-2 border-t">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="flex-1 appearance-none border border-gray-300 p-2 rounded-md mr-2 focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatInterface;
