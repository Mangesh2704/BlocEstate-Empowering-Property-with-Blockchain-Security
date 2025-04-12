import React, { useState } from 'react';
import axios from 'axios';

// Chatbot UI Styling
const ChatbotContainer = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  backgroundColor: '#ffffff',
  padding: '20px 25px',
  borderRadius: '15px',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
  width: '380px',
  maxWidth: '90%',
  height: '500px',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Roboto, sans-serif',
  border: '1px solid #ddd',
  transform: 'translateY(100%)',
  opacity: 0,
  transition: 'transform 0.5s ease, opacity 0.3s ease',
};

const ChatbotIconContainer = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  width: '60px',
  height: '60px',
  backgroundColor: '#4c46b6',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  zIndex: 10,
  color: 'white',
  fontSize: '30px',
  transition: 'opacity 0.3s ease, transform 0.3s ease',
  animation: 'bounce 1s infinite',
};

const CloseButton = {
  position: 'absolute',
  top: '-2px',
  right: '3px',
  fontSize: '20px',
  cursor: 'pointer',
  color: 'black',
  backgroundColor: 'transparent',
  border: 'none',
  padding: '5px',
  transition: 'opacity 0.3s ease, transform 0.2s',
  zIndex: 1,
};

const MessageContainer = {
  flexGrow: 1,
  overflowY: 'auto',
  marginBottom: '15px',
  paddingRight: '10px',
  paddingLeft: '15px',
  fontSize: '14px',
  maxHeight: '400px',
  scrollBehavior: 'smooth',
};

const UserMessage = {
  backgroundColor: '#e0e0e0',
  padding: '12px 18px',
  borderRadius: '18px',
  margin: '10px 0',
  maxWidth: '80%',
  alignSelf: 'flex-end',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  fontSize: '15px',
  wordWrap: 'break-word',
};

const BotMessage = {
  backgroundColor: '#4c46b6',
  color: 'white',
  padding: '12px 18px',
  borderRadius: '18px',
  margin: '10px 0',
  maxWidth: '80%',
  alignSelf: 'flex-start',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  fontSize: '15px',
  wordWrap: 'break-word',
};

const InputContainer = {
  display: 'flex',
  alignItems: 'center',
  paddingTop: '10px',
  borderTop: '1px solid #ddd',
  paddingBottom: '5px',
};

const InputField = {
  flexGrow: 1,
  padding: '12px 15px',
  borderRadius: '25px',
  border: '1px solid #ddd',
  fontSize: '16px',
  outline: 'none',
  transition: 'border-color 0.3s ease',
  backgroundColor: '#f7f7f7',
};

const SendButton = {
  backgroundColor: '#4c46b6',
  color: 'white',
  border: 'none',
  borderRadius: '25px',
  padding: '12px 18px',
  marginLeft: '12px',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.3s ease, transform 0.2s',
  animation: 'pulse 2s infinite',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
};

const SendButtonHover = {
  backgroundColor: '#2980b9',
  transform: 'scale(1.05)',
};

const animations = `
  @keyframes bounce {
    0% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0); }
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;

// Default message and buttons
const defaultMessage = {
  text: 'Hello, welcome to BlocEstate! How can we help you?',
  sender: 'bot',
};

const quickButtons = [
  { label: 'What is blockchain?', query: 'What is blockchain?' },
  { label: 'What is Ether?', query: 'What is Ether?' },
  { label: 'How to buy crypto?', query: 'How to buy crypto?' },
  { label: 'What is Escrow?', query: 'What is Escrow?' },
];

const Chatbot = () => {
  const [messages, setMessages] = useState([defaultMessage]); // Start with default message
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isIconVisible, setIsIconVisible] = useState(true);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    const sendRequest = async (retryCount = 0) => {
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: input }],
            temperature: 0.7,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer `, // Replace with your Open AI API key securely
            },
          }
        );

        const botReply = response.data.choices[0].message.content.trim();
        setMessages([...newMessages, { text: botReply, sender: 'bot' }]);

      } catch (error) {
        if (error.response && error.response.status === 429) {
          const retryAfter = error.response.headers['retry-after'];
          const delay = retryAfter ? parseInt(retryAfter) * 1000 : 2000;
          console.warn(`Rate limit exceeded. Retrying after ${delay / 1000} seconds.`);
          setTimeout(() => sendRequest(retryCount + 1), delay);
        } else {
          console.error('Error fetching from API:', error);
          setMessages([
            ...newMessages,
            { text: 'Sorry, I am having trouble right now. Please try again later.', sender: 'bot' },
          ]);
        }
      }
    };

    sendRequest();
  };

  const handleButtonClick = (query) => {
    const newMessages = [...messages, { text: query, sender: 'user' }];
    setMessages(newMessages);
    setInput(query);

    // Simulate an API call for the selected query
    const sendRequest = async () => {
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: query }],
            temperature: 0.7,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer `, // Replace with your Open AI API key securely
            },
          }
        );

        const botReply = response.data.choices[0].message.content.trim();
        setMessages([...newMessages, { text: botReply, sender: 'bot' }]);
      } catch (error) {
        console.error('Error fetching from API:', error);
        setMessages([
          ...newMessages,
          { text: 'Sorry, I am having trouble right now. Please try again later.', sender: 'bot' },
        ]);
      }
    };

    sendRequest();
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    setIsIconVisible(!isIconVisible);
  };

  const closeChatbot = () => {
    setIsOpen(false);
    setIsIconVisible(true);
  };

  return (
    <>
      <style>{animations}</style>

      {isIconVisible && (
        <div
          style={ChatbotIconContainer}
          onClick={toggleChatbot}
        >
          <span>💬</span>
        </div>
      )}

      <div
        style={{
          ...ChatbotContainer,
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <button
          onClick={closeChatbot}
          style={CloseButton}
        >
          ✖
        </button>

        <div style={MessageContainer}>
          {messages.map((msg, index) => (
            <div key={index} style={msg.sender === 'user' ? UserMessage : BotMessage}>
              {msg.text}
            </div>
          ))}
        </div>

        {/* Quick Action Buttons */}
        {messages.length === 1 && (
          <div>
            {quickButtons.map((button, index) => (
              <button
                key={index}
                onClick={() => handleButtonClick(button.query)}
                style={{
                  backgroundColor: '#4c46b6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '10px 15px',
                  margin: '5px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                {button.label}
              </button>
            ))}
          </div>
        )}

        <div style={InputContainer}>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask me anything..."
            style={InputField}
          />
          <button
            onClick={handleSendMessage}
            style={{ ...SendButton, ...(isHovered ? SendButtonHover : {}) }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
