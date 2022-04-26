import React, { useState } from 'react';
import Icon from './components/Icon'
import Bot from './components/Bot'
import background from './assets/chatbot-background.png'

const App: React.FC = () => {
  const [display, setDisplay] = useState(false);

  return (
    <div className='main'>
      <iframe style={{ width: "1900px", height: "1450px" }} src="https://moodle.medtech.tn/" ></iframe>
      {/* <img style={{ width: "1900px", height: "1400px" }} src={background} alt="chatbot-background"></img> */}
      <Icon iconState={[display, setDisplay]} />
      <Bot botState={[display, setDisplay]} />
    </div>
  );
}

export default App;
