import React, { useState } from 'react';
import axios from 'axios';
import './App.css'

const App = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = async () => {
        const newMessage = { role: 'user', content: input };
        const updatedMessages = [...messages, newMessage];

        setMessages(updatedMessages);
        setInput('');

        try {
            const response = await axios.post('http://localhost:5000/api/chat', { messages: updatedMessages });
            setMessages([...updatedMessages, response.data.choices[0].message]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div>
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.role === 'user' ? 'user-message' : 'bot-message'}>
                        {msg.content}
                    </div>
                ))}
            </div>
            <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button  onClick={sendMessage}>Send</button>
        </div>
    );
};

export default App;
