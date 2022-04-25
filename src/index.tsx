import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const container = document.getElementById('chatbot');
const root = ReactDOM.createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);



