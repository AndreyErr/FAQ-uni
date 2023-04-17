import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import UserStore from './dataStore/UserStore';
import { BrowserRouter } from 'react-router-dom';

//require('dotenv').config()

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <Context.Provider value={{
      user: new UserStore()
    }}>
      <App />
    </Context.Provider>
    </BrowserRouter>
);