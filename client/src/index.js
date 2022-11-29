import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';

import { AuthProvider } from "./context/AuthContext";
import { GameContextProvider } from "./context/GameContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AuthProvider>
          <GameContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
          </GameContextProvider>
      </AuthProvider>
  </React.StrictMode>
);
