import React, {useState} from "react";

import MainPanel from "../MainPanel/MainPanel";
import LoginPanel from "../LoginPanel/LoginPanel";
import LobbyPanel from "../LobbyPanel/LobbyPanel";
import SignupPanel from "../SignupPanel/SignupPanel";
import RankingPanel from "../RankingPanel/RankingPanel";
import HistoryPanel from "../HistoryPanel/HistoryPanel";

function MainMenu() {

    const [panel, setPanel] = useState('main');

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
            case 'ranking':
                return <RankingPanel setPanel={updatePanel} />;
            case 'history':
                return <HistoryPanel setPanel={updatePanel} />;
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