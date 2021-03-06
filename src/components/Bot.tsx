import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { message } from '../types/message.type'
import Feed from './Feed'
import ChatBox from './ChatBox'
import Dock from './Dock'
import '../styles//Bot.css'


type Props = {
    botState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
};

const Bot: React.FC<Props> = ({ botState }) => {
    const messages: Array<message> = [{
        user: "bot",
        text: "Hello there my friend. my name is Optimus 🤖. How can I help you today?",
        date: new Date()
    }];

    const [display, setDisplay] = botState;
    const [message, setMessage] = useState(messages);
    const [loading, setLoading] = useState(false);


    return (
        <CSSTransition
            in={display}
            timeout={2000}
            classNames="bot-display"
            unmountOnExit>
            <div className='bot-container'>
                <div className='bot-app'>
                    <Dock botState={botState} />
                    <Feed messageState={[message, setMessage]} loadingState={[loading, setLoading]} />
                    <ChatBox messageState={[message, setMessage]} loadingState={[loading, setLoading]} />
                </div>
            </div>
        </CSSTransition>
    );
};

export default Bot;