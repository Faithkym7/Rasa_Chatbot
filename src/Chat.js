import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const sendMessage = async () => {
    const newMessage = { text: userInput, user: true };
    setMessages([...messages, newMessage]);
    setUserInput('');

    try {
      const response = await axios.post('http://rasa_server_address:5005/webhooks/rest/webhook', {
        sender: 'user',
        message: userInput,
      });
      // Handle the response from Rasa, which contains the chatbot's reply
      // For example:
      const botReply = response.data[0].text;
      const botMessage = { text: botReply, user: false };
      setMessages([...messages, botMessage]);
    } catch (error) {
      console.error('Error sending message to Rasa:', error);
    }
  };

  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={message.user ? 'user-message' : 'bot-message'}>
            {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
      />
      <div>
      </div>
    </div>
  );
};

export default Chat;
