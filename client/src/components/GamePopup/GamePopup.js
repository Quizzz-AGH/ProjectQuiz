import React from "react";

import './GamePopup.css';

const GamePopup = ({ children, handleClose }) => {
    return (
        <div className={'game-popup-box'}>
            <div className={'game-box'}>
                {children}
                <button className={'close-popup'} onClick={handleClose}>Anuluj</button>
            </div>
        </div>
    )
}

export default GamePopup;