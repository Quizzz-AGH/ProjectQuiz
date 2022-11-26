import React from "react";

import './AnswerBox.css';

function AnswerBox({ answers }) {

    const AnswerList = () => {
        return answers.map((answer) => {
            return <button className={'answerButton'}>{answer}</button>;
        })
    }

    return (
        <div className={'answerBox'} >
            {AnswerList()}
        </div>
    )
}

export default AnswerBox;