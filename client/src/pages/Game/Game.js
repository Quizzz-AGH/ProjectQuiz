import React, {useEffect, useRef, useState} from "react";
import { io } from "socket.io-client";
import {useNavigate} from "react-router-dom";

import TimeBar from "../../components/TimeBar/TimeBar";
import AnswerBox from "../../components/AnswerBox/AnswerBox";
import AnswerBar from "../../components/AnswerBar/AnswerBar";
import GamePopup from "../../components/GamePopup/GamePopup";

import {useAuth} from "../../hooks/useAuth";
import {useGameContext} from "../../hooks/useGameContext";

function Game() {

    const {token} = useAuth();
    const {gameStreak, gameState, setGameStreak, setGameState} = useGameContext();
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [gameCode, setGameCode] = useState(null);
    const [time, setTime] = useState(120);
    const [timeRunning, setTimeRunning] = useState(false);
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState([])
    const [ownAnswers, setOwnAnswers] = useState([]);
    const [opponentAnswers, setOpponentAnswers] = useState([]);
    const socket = useRef();

    useEffect(() => {
        socket.current = io('ws://localhost:5001');

        socket.current.on('start-game', (question) => {
            console.log('ąąą');
            setGameState('game');
            setQuestion(question.text);
            setAnswers(question.answers);
            setTimeRunning(true);
        })

        socket.current.on('opponent-answered', (verdict) => {
            setOpponentAnswers((prev) => [...prev, verdict]);
        })

        socket.current.on('question-changed', (question) => {
            setQuestion(question.text);
            setAnswers(question.answers);
        })
    }, []);


    useEffect(() => {
        timeRunning && time > 0 && setTimeout(() => setTime(time - 1), 1000);
    }, [time, timeRunning]);

    useEffect(() => {
        console.log('own ', ownAnswers);
        console.log('opp ', opponentAnswers)
    }, [ownAnswers, opponentAnswers]);

    const createNewGame = async () => {
        const response = await fetch('/queues/normal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.msg);
        } else {
            console.log({token: token, gameCode: json.lobby.code});
            setGameCode(json.lobby.code);
            socket.current.emit('join-game', {token: token, gameCode: `${json.lobby.code}`});
        }
    }

    const joinGame = async (e) => {
        e.preventDefault();
        const response = await fetch(`/queues/join/${gameCode}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.msg);
        } else {
            socket.current.emit('join-game', {token: token, gameCode: gameCode});
        }
    }

    const pickAnswer = (id) => {
        socket.current.emit('answer-chosen', {token: token,
                                              chosenAnswer: id,
                                              gameCode: `${gameCode}`},
                                              (verdict) => {
                                                  setOwnAnswers((prev) => [...prev, verdict]);
                                              });
    }

    const renderView = () => {
        switch (gameState) {
            case 'game':
                return (
                    <div className={'backdrop'}>
                        <TimeBar value={time} maxValue={120}/>
                        <div className={'questionBox'}>{question}</div>
                        <AnswerBox pickAnswer={pickAnswer} answers={answers} />
                        <AnswerBar answers={ownAnswers} />
                        <AnswerBar answers={opponentAnswers} />
                    </div>
                )
            case 'create':
                return (<GamePopup handleClose={() => navigate('/')}>
                            {error && <span className={'lobby-error'}>{error}</span>}
                            <div>Twój kod gry:
                                <div className={'game-code'}>{gameCode}</div>
                            </div>
                            <button onClick={createNewGame}>Utwórz grę</button>
                        </GamePopup>)
            case 'join':
                return (<GamePopup handleClose={() => navigate('/')}>
                            {error && <span className={'lobby-error'}>{error}</span>}
                            <form onSubmit={joinGame}>
                                <label>Podaj kod gry:</label>
                                <input type={'number'} onChange={(e) => setGameCode(e.target.value)} />
                                <button>Dołącz do gry</button>
                            </form>
                        </GamePopup>)
            case 'ranked':
                return null;
            default:
                return null;
        }
    }

    return (
        <>
            {renderView()}
        </>

    )
}

export default Game;