import React from "react";

import './Popup.css';

const Popup = ({children}) => {
    return (
        <div className={'popup-box'}>
            <div className={'box'}>
                {children}
            </div>
        </div>
    )
}

export default Popup;
