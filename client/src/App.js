import React from "react";
import { Route, Routes } from "react-router-dom";

import './App.css';

import MainMenu from "./components/MainMenu/MainMenu";
import Game from "./components/Game/Game";
import AdminPanel from "./components/AdminPanel/AdminPanel";

function App() {
    return (
            <div className="App">
                <Routes>
                    <Route exact path={"/"} element={<MainMenu />}/>
                    <Route path={"/admin"} element={<AdminPanel />}/>
                    <Route path={"/game"} element={<Game />}/>
                </Routes>
            </div>
  );
}

export default App;
