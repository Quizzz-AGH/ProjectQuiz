import React from "react";

function QuestionLog({ question, setDelete, setUpdate }) {
    const answers = question.answers;

    const listAnswers = [];

    for(let i = 0; i < 4; ++i) {
        listAnswers.push(<td>{answers[i]?.text}</td>)
    }

    return (
        <tr>
            <td>{question._id}</td>
            <td>{question.text}</td>
            {listAnswers}
            <td><button onClick={() => setUpdate(question)}>Zmień</button></td>
            <td><button onClick={() => setDelete(question)}>x</button></td>
        </tr>
    )
}

export default QuestionLog;