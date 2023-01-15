import React from "react";

import './AnswerBar.css';

function AnswerBar({ answers }) {

    const boxes = () => {
        return [...Array(20)].map((_, i) => (
           <div className={'answer'}>
               {i in answers &&
                   ((answers[i]) ?
                        '✓' :
                        '✗')
               }
           </div>
        ));
    }

    return (
        <div className={'answerBar'}>
            {boxes()}
        </div>
    )
}

export default AnswerBar;
