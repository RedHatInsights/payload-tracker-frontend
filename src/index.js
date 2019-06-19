import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import openSocket from 'socket.io-client';

var socket = openSocket('http://localhost:8080');

ReactDOM.render(<App socket={socket}/>, document.getElementById('root'));

