import React from "react";
import {useNavigate} from "react-router-dom";

const AdminNavbar = ({ panel, setPanel }) => {
    const navigate = useNavigate();

    return (
        <div>
            <nav>
                <h3>{panel === 'questions' ? 'Pytania' : 'Użytkownicy'}</h3>
                <div>
                    {panel === 'questions' && <button onClick={() => setPanel('users')}>Użytkownicy</button>}
                    {panel === 'users' && <button onClick={() => setPanel('questions')}>Pytania</button>}
                    <button onClick={() => navigate('/')}>Powrót</button>
                </div>
            </nav>
        </div>
    )
}

export default AdminNavbar;
