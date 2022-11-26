import React from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";

function LobbyPanel({setPanel}) {

    const navigate = useNavigate();
    const { token } = useAuth();

    return (
        <>
            <button onClick={() => navigate('/game')}>Utwórz grę</button>
            <button>Dołącz do gry</button>
            { token && <button>Gra rankingowa</button> }
            <button onClick={setPanel('main')}>Powrót</button>
        </>
    )
}

export default LobbyPanel
