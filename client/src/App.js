import React from "react";
import { Route, Routes } from "react-router-dom";

import './App.css';

import MainMenu from "./pages/MainMenu/MainMenu";
import Admin from "./pages/Admin/Admin";
import Game from "./pages/Game/Game";

function App() {
    return (
            <div className="App">
                <Routes>
                    <Route exact path={"/"} element={<MainMenu />}/>
                    <Route path={"/admin"} element={<Admin />}/>
                    <Route path={"/game"} element={<Game />}/>
                </Routes>
            </div>
  );
}

export default App;
