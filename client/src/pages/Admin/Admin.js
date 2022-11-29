import React, {useEffect, useState} from "react";

import QuestionLog from "../../components/QuestionLog/QuestionLog";
import {useAuth} from "../../hooks/useAuth";

function AdminPanel() {

    const [questions, setQuestions] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        async function getQuestions() {
            const response = await fetch('/questions', {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
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