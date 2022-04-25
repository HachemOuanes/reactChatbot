import React, { useEffect, useState } from 'react';
import send from '../assets/send.png'
import './ChatBox.css'
import botService from '../services/botService'
type message = {
    user: string,
    text: string,
    date: Date
}
type Props = {
    messageState: [message[], React.Dispatch<React.SetStateAction<message[]>>]
};

const ChatBox: React.FC<Props> = ({ messageState }) => {
    const [input, setInput] = useState("");
    const [messages, setMessage] = messageState;
    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const messageObject = {
            user: "self",
            text: input,
            date: new Date()
        }
        const responseObject = {
            user: "bot",
            text: "",
            date: new Date()
        }
        botService(input)
            .then(response => {
                responseObject.text = response;
                setMessage(messages => [...messages, responseObject])
            })
        setMessage(messages => [...messages, messageObject]);

        
        const widget: HTMLElement | null = document.getElementById('chatbot');
        if (widget) {
            Array.from(widget.querySelectorAll("input")).forEach(
                input => (input.value = "")
            );
        }
        console.log(`👱 : ${input}`);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setInput(event.target.value);
    }

    return (
        <div className='chatbox'>
            <form className='prompt'>
                <input className='submit-input' type='text' placeholder="Type your message here" onChange={handleChange} />
                <button className='submit-button' onClick={handleSubmit} type='submit'>
                    <img className='submit-icon' src={send}></img>
                </button>
            </form>
            <div className='footer'></div>
        </div>
    );
};

export default ChatBox;