import React from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {useGameContext} from "../../hooks/useGameContext";

function LobbyPanel({setPanel}) {

    const navigate = useNavigate();
    const { accountId } = useAuth();
    const { setGameState } = useGameContext();

    return (
        <>
            <button onClick={() => {
                setGameState('create');
                navigate('/game');
            }}>Utwórz grę</button>
            <button onClick={() => {
                setGameState('join');
                navigate('/game');
            }}>Dołącz do gry</button>
            { accountId && <button>Gra rankingowa</button> }
            <button onClick={setPanel('main')}>Powrót</button>
        </>
    )
}

export default LobbyPanel
