import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Feed from './Feed'
import ChatBox from './ChatBox'
import Dock from './Dock'
import './Bot.css'

type message = {
    user: string,
    text: string,
    date: Date
}
type Props = {
    botState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
};

const Bot: React.FC<Props> = ({ botState }) => {
    const [display, setDisplay] = botState;

    const messages: Array<message> = [{
        user: "bot",
        text: "Hello there my friend. my name is Optimus 🤖. How can I help you today?",
        date: new Date()
    }];
    const [message, setMessage] = useState(messages);
    return (
        <CSSTransition
            in={display}
            timeout={2000}
            classNames="bot-display"
            unmountOnExit>
            <div className='bot-container'>
                <div className='bot-app'>
                    <Dock botState={botState} />
                    <Feed messageState={[message, setMessage]} />
                    <ChatBox messageState={[message, setMessage]} />
                </div>
            </div>
        </CSSTransition>
    );
};

export default Bot;