import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import Popup from "../Popup/Popup";
import {useSocket} from "../../hooks/useSocket";

function LobbyPanel({setPanel}) {

    const [newPopup, setNewPopup] = useState(false);
    const [joinPopup, setJoinPopup] = useState(false);
    const [rankedPopup, setRankedPopup] = useState(false);
    const [opponentFoundPopup, setOpponentFoundPopup] = useState(false);

    const [gameCode, setGameCode] = useState("");
    const navigate = useNavigate();
    const { accountId, loggedIn } = useAuth();
    const socket = useSocket();

    useEffect(() => {
        socket.on('start-game', () => {
           navigate('/game');
        });
    }, []);

    const newGame = async () => {
        const response = await fetch('/lobby/normal', {
            method: "POST"
        });

        const json = await response.json();

        if (!response.ok) {
            window.alert("Something's wrong");
        } else {
            setGameCode(json.lobby.code);
            const arg = { playerId: accountId, lobbyId: json.lobby._id };
            console.log(arg);
            socket.emit('join-game', arg);
        }

        setNewPopup(true);
    }

    const rankedGame = async () => {
        const response = await fetch('lobby/ranked', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ playerId: accountId })
        })

        const json = await response.json();

        if (!response.ok) {
            window.alert("Something's wrong");
        } else {
            setGameCode(json.lobby.code);
            const arg = { playerId: accountId, lobbyId: json.lobby._id }
            socket.emit('join-game', arg);
        }

        setRankedPopup(true);
    }

    const joinGame = async (e) => {
        e.preventDefault();

        const response = await fetch(`lobby/join/${gameCode}`, {
            method: "POST"
        });

        const json = await response.json();

        if (!response.ok) {
            window.alert("Something's wrong");
        } else {
            const arg = {playerId: accountId, lobbyId: json._id};
            console.log(arg);
            socket.emit('join-game', arg);
        }
    }

    const handleCancel = async (setPopup) => {
        await fetch('/lobby/leave', {
            method: "GET"
        })
        setPopup(false);
    }

    return (
        <>
            {newPopup &&
                <Popup>
                    <div>
                        <div>Kod twojej gry to {gameCode}.</div>
                        <div>Przekaż go drugiemu graczowi.</div>
                    </div>
                    <button onClick={() => handleCancel(setNewPopup)}>Anuluj</button>
                </Popup>
            }
            {joinPopup &&
                <Popup>
                    <form onSubmit={joinGame}>
                        <label>Podaj kod gry:</label>
                        <input type={'number'} onChange={(e) => setGameCode(e.target.value)} />
                        <input type={'submit'} value={'Dołącz'}/>
                    </form>
                    <button onClick={() => setJoinPopup(false)}>Anuluj</button>
                </Popup>
            }
            {rankedPopup &&
                <Popup>
                    <button onClick={() => handleCancel(setRankedPopup)}>Anuluj</button>
                </Popup>
            }
            {opponentFoundPopup &&
                <Popup>
                    <button onClick={() => handleCancel(setOpponentFoundPopup)}>Odrzuć</button>
                </Popup>
            }
            <button onClick={newGame}>Utwórz grę</button>
            <button onClick={() => setJoinPopup(true)}>Dołącz do gry</button>
            { loggedIn && <button onClick={rankedGame}>Gra rankingowa</button> }
            <button onClick={setPanel('main')}>Powrót</button>
        </>
    )
}

export default LobbyPanel
