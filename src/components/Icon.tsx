import React, { Dispatch, SetStateAction, } from 'react';
import { CSSTransition } from 'react-transition-group';
import './Icon.css';
import Logo from "../assets/chatbot-logo.png";

type Props = {
    iconState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
};

const Icon: React.FC<Props> = ({ iconState }) => {
    const [display, setDisplay] = iconState;
    const hideIcon = () => {
        setDisplay(!display);
        console.log(">> Chatbot Activated 🤖")
    }
    return (
        <CSSTransition
            in={!display}
            timeout={1000}
            classNames="icon-display"
            unmountOnExit
            appear>
            <div className='icon-container'>
                <img className='icon-image icon' src={Logo} />
                <button className='icon-button icon' onClick={hideIcon} />
            </div>
        </CSSTransition>
    );
};

export default Icon;