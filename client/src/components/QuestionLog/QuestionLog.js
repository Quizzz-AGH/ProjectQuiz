import React from "react";

function QuestionLog(props) {
    const answers = props.question.answers;

    const listAnswers = [];

    for(let i = 0; i < 4; ++i) {
        listAnswers.push(<td>{answers[i]?.text}</td>)
    }

    return (
        <tr>
            <td>{props.question._id}</td>
            <td>{props.question.text}</td>
            {listAnswers}
        </tr>
    )
}

export default QuestionLog;