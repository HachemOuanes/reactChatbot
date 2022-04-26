import React, { useState, useEffect, useRef } from 'react';
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
    const [messages, setMessage] = messageState;
    const refContainer = useRef<HTMLDivElement>(null);


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