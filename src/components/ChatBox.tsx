import React, { useEffect, useRef, useState } from 'react';
import send from '../assets/send.png'
import '../styles/ChatBox.css'
import botService from '../services/botService'
import { message } from '../types/message.type'
type Props = {
    messageState: [message[], React.Dispatch<React.SetStateAction<message[]>>]
    loadingState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
};

const ChatBox: React.FC<Props> = ({ messageState, loadingState }) => {
    const refMessage = useRef<string>("");
    const refInput = useRef<HTMLInputElement>(null);
    const [messages, setMessage] = messageState;
    const [style, setStyle] = useState("submit-button");
    const [loading, setLoading] = loadingState;


    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setStyle('submit-button');
        const messageObject: message = {
            user: "self",
            text: refMessage.current.toString(),
            date: new Date()
        }
        setMessage(messages => [...messages, messageObject]);
        setLoading(true);
        
        botService(refMessage.current.toString())
            .then(responseObject => {
                setLoading(false);
                setMessage(messages => [...messages, responseObject])
            })

        refInput.current ? refInput.current.value = "" : null
        console.log(`👱 : ${refMessage.current}`);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        refMessage.current = event.target.value;
        refMessage.current == "" ? setStyle('submit-button') : setStyle('submit-button highlighted')
    }


    return (
        <div className='chatbox'>
            <form className='prompt'>
                <input ref={refInput} className="submit-input" type='text' placeholder="Type your message here" onChange={handleChange} />
                <button className={style} onClick={handleSubmit} type='submit'>
                    <img className='submit-icon' src={send}></img>
                </button>
            </form>
            <div className='footer'></div>
        </div>
    );
};

export default ChatBox;