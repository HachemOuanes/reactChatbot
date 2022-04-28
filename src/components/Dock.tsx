import React from 'react';
import '../styles//Dock.css'
import back from '../assets/back-arrow.svg'

type Props = {
    botState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
};


const Dock: React.FC<Props> = ({ botState }) => {
    const [display, setDisplay] = botState;
    const hideBot = () => {
        setDisplay(!display);
        console.log(">> Chatbot Desactived 🤖")
    }
    return (
        <div className='dock'>
            <button className='close-button' onClick={hideBot}>
                <img src={back}></img>
            </button>
            <h1 className='bot-title'>ChatBot</h1>
        </div>
    );
};

export default Dock;