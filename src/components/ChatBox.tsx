import React, { useEffect, useRef, useState } from 'react';
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
    const refMessage = useRef<string>("");
    const refInput = useRef<HTMLInputElement>(null);
    const [messages, setMessage] = messageState;
    const [style, setStyle] = useState("submit-button");

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const messageObject = {
            user: "self",
            text: refMessage.current.toString(),
            date: new Date()
        }
        const responseObject = {
            user: "bot",
            text: "",
            date: new Date()
        }
        botService(refMessage.current.toString())
            .then(response => {
                responseObject.text = response;
                setMessage(messages => [...messages, responseObject])
            })
        setMessage(messages => [...messages, messageObject]);

        refInput.current ? refInput.current.value = "" : null
        console.log(`👱 : ${refMessage.current}`);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        refMessage.current = event.target.value;
        refMessage.current == "" ? setStyle('submit-button') : setStyle('submit-button-highlighted')
    }
    useEffect(() => {
        setStyle('submit-button');
    }, [messages])

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