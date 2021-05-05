import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ImgProvider } from '../src/contexts/ImgContext';

ReactDOM.render(
  <BrowserRouter>
    <ImgProvider>
      <App />
    </ImgProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
