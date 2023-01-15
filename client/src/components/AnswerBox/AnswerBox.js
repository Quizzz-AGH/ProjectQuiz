import React from "react";

import './AnswerBox.css';

function AnswerBox({ pickAnswer, answers }) {

    const AnswerList = () => {
        return [...Array(4)].map((_, i) => {
            return <button
                className={'answerButton'}
                onClick={() => pickAnswer(i)}>
                {answers[i]}
            </button>
        })
    }

    return (
        <div className={'answerBox'} >
            {AnswerList()}
        </div>
    )
}

export default AnswerBox;