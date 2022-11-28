import React, {useEffect, useState} from "react";

import QuestionLog from "../QuestionLog/QuestionLog";

function AdminPanel() {

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        async function getQuestions() {
            const response = await fetch('/questions', {
                method: "GET"
            });

            if (!response.ok) {
                window.alert(`An error occured: ${response.statusText}`);
                return;
            }

            const questions = await response.json();
            setQuestions(questions.questions);
        }

        getQuestions();
    }, [questions.length]);

    function questionList() {
        return questions.map((record) => {
            return (
                <QuestionLog question={record} />
            );
        });
    }

    return (
        <div>
            <h3>Question List</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Content</th>
                        <th>Answer 1</th>
                        <th>Answer 2</th>
                        <th>Answer 3</th>
                        <th>Answer 4</th>
                    </tr>
                </thead>
                <tbody>{questionList()}</tbody>
            </table>
        </div>
    )
}

export default AdminPanel;