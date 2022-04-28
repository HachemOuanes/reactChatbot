import React, { useState, useEffect, useRef } from 'react';
import '../styles//Feed.css'
import { CSSTransition } from 'react-transition-group'
import { message } from '../types/message.type'
import logo from '../assets/chatbot-background.png'

type Props = {
    messageState: [message[], React.Dispatch<React.SetStateAction<message[]>>]
};

const Feed: React.FC<Props> = ({ messageState }) => {
    const [messages, setMessage] = messageState;
    const refContainer = useRef<HTMLDivElement>(null);
    const openInNewTab = (url: string) => {
        setTimeout(() => {
            const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
            if (newWindow) newWindow.opener = null
        }, 2000)
    }


    useEffect(() => {
        refContainer.current ? refContainer.current.scrollTop = refContainer.current.scrollHeight : null;
    });

    // Delayed Rendering 

    // const [isShown, setIsShown] = useState(false);
    // useEffect(() => {
    //     setIsShown(false);
    //     const timer = setTimeout(() => {
    //         setIsShown(true);
    //         console.log(isShown);
    //     }, 1000);
    //     return () => clearTimeout(timer);
    // }, [messages]);

    return (
        <div className='feed' id='feed' ref={refContainer}>
            <ul className="message-list">
                {messages.map((message, index) => {
                    if (message.user == "self") {
                        return (
                            <div className='self-message-container'>
                                <div className='message-date'>{message.date.toLocaleTimeString('en-US')}</div>
                                <li className='self-message'>
                                    {message.text}
                                </li>
                            </div>
                        )
                    }
                    else {
                        if (index == messages.length - 1) {
                            // message.url ? openInNewTab(message.url) : null
                            return (
                                <CSSTransition
                                    in={true}
                                    timeout={1000}
                                    classNames="last-message"
                                    unmountOnExit
                                    appear
                                >
                                    <div className='bot-message-container'>
                                        <div className='message-date'>{message.date.toLocaleTimeString('en-US')}</div>
                                        <li className='bot-message'>
                                            {message.text}
                                            {/* <img src={message.image} style={{ width: "100%" }}></img> */}
                                        </li>
                                    </div>
                                </CSSTransition>
                            )
                        }
                        else {
                            return (
                                <div className='bot-message-container'>
                                    <div className='message-date'>{message.date.toLocaleTimeString('en-US')}</div>
                                    <li className='bot-message'>
                                        {message.text}
                                        {/* <img src={message.image} style={{ width: "100%" }}></img> */}
                                    </li>
                                </div>
                            )
                        }
                    }
                })}
            </ul>
        </div>
    );
};

export default Feed;