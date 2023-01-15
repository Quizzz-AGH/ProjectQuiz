import React, {useEffect, useState} from "react";

import TimeBar from "../TimeBar/TimeBar";
import AnswerBox from "../AnswerBox/AnswerBox";
import AnswerBar from "../AnswerBar/AnswerBar";
import {useSocket} from "../../hooks/useSocket";
import {useAuth} from "../../hooks/useAuth";
import Popup from "../Popup/Popup";
import {useNavigate} from "react-router-dom";

function Game() {

    const [time, setTime] = useState(120);
    const [questionId, setQuestionId] = useState(0);
    const [question, setQuestion] = useState("");
    const [answers, setAnswers] = useState([])
    const [ownAnswers, setOwnAnswers] = useState([]);
    const [opponentAnswers, setOpponentAnswers] = useState([]);
    const [endPopup, setEndPopup] = useState(null);
    const {accountId} = useAuth();
    const socket = useSocket();
    const navigate = useNavigate();

    useEffect(() => {

        socket.on('opponent-answered', (verdict) => {
            setOpponentAnswers([...opponentAnswers, verdict]);
        });

        socket.on('time', (time) => {
            setTime(time);
        })

        socket.on('question-changed', (question) => {
            setQuestionId(question._id);
            setQuestion(question.text);
            setAnswers(question.answers);
        });

        socket.on('game-ended', (result) => {
            setEndPopup(result);
        })
    }, []);

    // useEffect(() => {
    //     console.log(ownAnswers);
    //     console.log(opponentAnswers);
    // }, [ownAnswers, opponentAnswers]);

    const pickAnswer = (id) => {
        socket.emit('answer-chosen', {
            playerId: accountId,
            questionId: questionId,
            chosenAnswer: id
        },
            (verdict) => setOwnAnswers([...ownAnswers, verdict]));
    }

    // useEffect(() => {
    //     timeRunning && time > 0 && setTimeout(() => setTime(time - 1), 1000);
    // }, [time, timeRunning]);

    return (
        <>
            {endPopup &&
            <Popup>
                <div>{ endPopup === 'won' ? 'Wygrałeś!' : 'Przegrałeś!'}</div>
                <button onClick={() => navigate('/')}>OK</button>
            </Popup>
            }
            <div className={'backdrop'}>
                <TimeBar value={time} maxValue={120}/>
                <div className={'questionBox'}>{question}</div>
                <AnswerBox pickAnswer={pickAnswer} answers={answers} />
                <AnswerBar answers={ownAnswers} />
                <AnswerBar answers={opponentAnswers} />
            </div>
        </>

    )
}

export default Game;