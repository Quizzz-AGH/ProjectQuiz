import React, {useEffect, useState} from "react";

import MainPanel from "../../components/MainPanel/MainPanel";
import SignupPanel from "../../components/SignupPanel/SignupPanel";
import LoginPanel from "../../components/LoginPanel/LoginPanel";
import LobbyPanel from "../../components/LobbyPanel/LobbyPanel";

import {useGameContext} from "../../hooks/useGameContext";

function MainMenu() {

    const {gameStreak} = useGameContext();
    const [panel, setPanel] = useState('main');

    useEffect(() => {
        setPanel(gameStreak ? 'lobby' : 'main');
    }, [gameStreak]);

    const updatePanel = (p) => () => {
        setPanel(p);
    }

    const renderPanel = () => {
        switch(panel) {
            case 'main':
                return <MainPanel setPanel={updatePanel} />;
            case 'login':
                return <LoginPanel setPanel={updatePanel} />;
            case 'register':
                return <SignupPanel setPanel={updatePanel} />;
            case 'lobby':
                return <LobbyPanel setPanel={updatePanel} />;
            default:
                return null;
        }
    }

    return (
        <div className={"backdrop"}>
            {renderPanel()}
        </div>
    )
}


export default MainMenu;