import React, { useState, useEffect, useRef } from 'react';
import '../styles//Feed.css'
import { CSSTransition } from 'react-transition-group'
import { message } from '../types/message.type'

type Props = {
    messageState: [message[], React.Dispatch<React.SetStateAction<message[]>>]
    loadingState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
};

const Feed: React.FC<Props> = ({ messageState, loadingState }) => {
    const [messages, setMessage] = messageState;
    const [loading, setLoading] = loadingState;
    const refContainer = useRef<HTMLDivElement>(null);

    const loadingMessage: message = {
        user: "bot",
        text: "...",
        date: new Date(),
        loading: true
    }

    const removeLast = (array: Array<any>) => {
        array.pop();
        return array;
    }

    useEffect(() => {
        if (loading) {
            setMessage(messages => [...messages, loadingMessage]);
            setTimeout(() => {
                setMessage(messages => removeLast(messages));
            });
        }
    }, [loading])


    // Open new browser widnow on action :

    const openInNewTab = (url: string) => {
        setTimeout(() => {
            const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
            if (newWindow) newWindow.opener = null
        }, 2000)
    }

    // Adjust scroll to bottom of the container

    useEffect(() => {
        refContainer.current ? refContainer.current.scrollTop = refContainer.current.scrollHeight : null;
    });

    // Delayed Rendering :

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
                    else if (message.user == "bot") {
                        if (message.loading) {
                            return (
                                <div className='bot-message-container'>
                                    <div className='message-date'>{message.date.toLocaleTimeString('en-US')}</div>
                                    <li className='bot-message'>
                                        <div className='loading-container'>
                                            <span className='loading-dot dot-one'></span>
                                            <span className='loading-dot dot-two'></span>
                                            <span className='loading-dot dot-three'></span>
                                        </div>
                                    </li>
                                </div>
                            )

                        }
                        if (index == messages.length - 1) {
                            message.url ? openInNewTab(message.url) : null
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
                                            {message.image ? <img src={message.image} style={{ width: "100%" }}></img> : null}
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
                                        {message.image ? <img src={message.image} style={{ width: "100%" }}></img> : null}
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