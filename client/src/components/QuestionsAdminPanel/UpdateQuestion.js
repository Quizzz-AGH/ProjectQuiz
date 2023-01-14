import React, {useState} from "react";

const UpdateQuestion = ({ updateQuestionPopup, close }) => {
    const [text, setText] = useState(updateQuestionPopup.text)
    const [answers, setAnswers] = useState(updateQuestionPopup.answers);

    const updateAnswers = (index, value) => {
        const next = answers.map((a, i) => {
            if (i === index) {
                return {...a, ...value};
            } else {
                return a;
            }
        });
        setAnswers(next);
    }

    const setCorrect = (index) => {
        const next = answers.map((a, i) => {
            if (i === index) {
                return {...a, correct: true};
            } else {
                return {...a, correct: false};
            }
        });
        setAnswers(next);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const newQuestion = {
            text: text,
            answers: answers
        };

        await fetch(`/questions/${updateQuestionPopup._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newQuestion)
        })
            .catch(error => {
                window.alert(error);
            })

        close();
    };

    return (
        <div>
            <h3>Zmień pytanie</h3>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor={'content'}>Treść</label>
                    <input
                        type={'text'}
                        id={'content'}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div>
                    {[...Array(answers.length)].map((_, i) => (
                        <>
                            <div>
                                <label htmlFor={'answer'+i}>Odpowiedź {i + 1}</label>
                                <input
                                    type={'text'}
                                    id={'answer'+i}
                                    value={answers[i].text}
                                    onChange={(e) => updateAnswers(i, { text: e.target.value })}
                                />
                                <input
                                    type={'radio'}
                                    name={'correctAnswer'}
                                    id={'correct'+i}
                                    checked={answers[i].correct}
                                    onChange={(_) => setCorrect(i)}
                                />
                            </div>
                        </>
                    ))}
                </div>
                <div>
                    <input
                        type={'submit'}
                        value={'Zmień'}
                    />
                    <button onClick={close}>Anuluj</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateQuestion;
