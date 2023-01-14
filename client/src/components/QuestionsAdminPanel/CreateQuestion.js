import React, {useState} from "react";

const CreateQuestion = ({ close }) => {
    const [text, setText] = useState("")
    const [answers, setAnswers] = useState([
            {text: "", correct: true},
            {text: "", correct: false},
            {text: "", correct: false},
            {text: "", correct: false}
    ]);

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

        await fetch('/questions', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newQuestion)
        })
            .catch(error => {
                window.alert(error);
            })

        setText("");
        setAnswers([
            {text: "", correct: true},
            {text: "", correct: false},
            {text: "", correct: false},
            {text: "", correct: false}
        ]);
        close();
    };

    return (
        <div>
            <h3>Nowe pytanie</h3>
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
                    {[...Array(4)].map((_, i) => (
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
                        value={'Dodaj'}
                    />
                    <button onClick={close}>Anuluj</button>
                </div>
            </form>
        </div>
    );
}

export default CreateQuestion;
