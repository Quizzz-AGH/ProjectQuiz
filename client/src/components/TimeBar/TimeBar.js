import React from "react";

import "./TimeBar.css";

function TimeBar({ value, maxValue }) {

    const showTime = (value) => {
        let mins = Math.floor(value / 60).toString();
        let secs = (value % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    }

    const setCompletion = () => {
        return `${100 * value / maxValue}%`;
    }

    return (
        <div className={'progressContainer'}>
            <span className={'progressLabel'}>{showTime(value)}</span>
            <div style={{width: setCompletion()}} className={'progressFilling'} />
        </div>
    )
}

export default TimeBar;
