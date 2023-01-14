import React, {useEffect, useState} from "react";

import QuestionLog from "../QuestionLog/QuestionLog";
import Popup from "../Popup/Popup";
import CreateQuestion from "./CreateQuestion";
import UpdateQuestion from "./UpdateQuestion";

function QuestionsAdminPanel() {

    const [questions, setQuestions] = useState([]);
    const [newQuestionPopup, setNewQuestionPopup] = useState(false);
    const [updateQuestionPopup, setUpdateQuestionPopup] = useState(null)
    const [deleteQuestionPopup, setDeleteQuestionPopup] = useState(null);

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
    }, [questions.length, newQuestionPopup, updateQuestionPopup, deleteQuestionPopup]);

    function questionList() {
        return questions.map((record) => {
            return (
                <QuestionLog question={record} setDelete={setDeleteQuestionPopup} setUpdate={setUpdateQuestionPopup} />
            );
        });
    }

    const handleDelete = async (question) => {
        await fetch(`/questions/${question._id}`, {
            method: "DELETE"
        })
            .catch(error => {
                window.alert(error);
            });
        setDeleteQuestionPopup(null);
    }

    return (
        <div>
            {newQuestionPopup &&
                <Popup>
                    <CreateQuestion close={() => setNewQuestionPopup(false)} />
                </Popup>
            }
            {updateQuestionPopup &&
                <Popup>
                    <UpdateQuestion updateQuestionPopup={updateQuestionPopup} close={() => setUpdateQuestionPopup(null)} />
                </Popup>
            }
            {deleteQuestionPopup &&
                <Popup>
                    <div>Czy usunąć pytanie {deleteQuestionPopup._id}? Nie można tego cofnąć.</div>
                    <div>
                        <button onClick={() => handleDelete(deleteQuestionPopup)}>Tak</button>
                        <button onClick={() => setDeleteQuestionPopup(null)}>Nie</button>
                    </div>
                </Popup>
            }
            <div>
                <button onClick={() => setNewQuestionPopup(true)}>Nowe pytanie</button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Content</th>
                    <th>Answer 1</th>
                    <th>Answer 2</th>
                    <th>Answer 3</th>
                    <th>Answer 4</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>{questionList()}</tbody>
            </table>
        </div>
    )
}

export default QuestionsAdminPanel;