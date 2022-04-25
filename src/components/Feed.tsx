import React, { useState, useEffect } from 'react';
import './Feed.css'
import { CSSTransition } from 'react-transition-group'

type message = {
    user: string,
    text: string,
    date: Date
}
type Props = {
    messageState: [message[], React.Dispatch<React.SetStateAction<message[]>>]
};

const Feed: React.FC<Props> = ({ messageState }) => {
    useEffect(() => {
        var element = document.getElementById('feed');
        element ? element.scrollTop = element.scrollHeight : null;
    });
    const [messages, setMessage] = messageState;

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
        <div className='feed' id='feed'>
            <ul className="message-list">
                {messages.map((message, index) => {
                    if (message.user == "self") {
                        return (
                            <div className='self-message-container'>
                                <li className='self-message'>
                                    {message.text}
                                </li>
                            </div>
                        )
                    }
                    else {
                        if (index == messages.length - 1) {
                            return (
                                <CSSTransition
                                    in={true}
                                    timeout={1000}
                                    classNames="last-message"
                                    unmountOnExit
                                    appear
                                >
                                    <div className='bot-message-container'>
                                        <li className='bot-message'>
                                            {message.text}
                                        </li>
                                    </div>
                                </CSSTransition>
                            )
                        }
                        else {
                            return (
                                <div className='bot-message-container'>
                                    <li className='bot-message'>
                                        {message.text}
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