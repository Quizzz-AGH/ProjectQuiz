import React, {useEffect, useState} from "react";

import TimeBar from "../TimeBar/TimeBar";
import AnswerBox from "../AnswerBox/AnswerBox";
import AnswerBar from "../AnswerBar/AnswerBar";

function Game() {

    const [time, setTime] = useState(120);
    const [question, setQuestion] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam");
    const [answers, setAnswers] = useState([
        'A', 'B', 'C', 'D'
    ])
    const [ownAnswers, setOwnAnswers] = useState([]);
    const [opponentAnswers, setOpponentAnswers] = useState([]);

    useEffect(() => {
        const id = setInterval(() => setTime((value) => value - 1), 1000);

        return () => {
            clearInterval(id);
        }
    }, []);

    return (
        <div className={'backdrop'}>
            <TimeBar value={time} maxValue={120}/>
            <div className={'questionBox'}>{question}</div>
            <AnswerBox answers={answers} />
            <AnswerBar answers={ownAnswers} />
            <AnswerBar answers={opponentAnswers} />
        </div>
    )
}

export default Game;