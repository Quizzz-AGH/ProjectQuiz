import React from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useLogout } from "../../hooks/useLogout";

function MainPanel({setPanel}) {

    const navigate = useNavigate();
    const { role, loggedIn } = useAuth();
    const { logout } = useLogout();

    return (
        <>
            <button onClick={setPanel('lobby')}>Graj</button>
            { loggedIn && <button onClick={setPanel('history')}>Historia</button> }
            <button onClick={setPanel('ranking')}>Ranking</button>
            { role === 'admin' && <button onClick={() => navigate('/admin')}>Administracja</button> }
            { !loggedIn && <button onClick={setPanel('login')}>Zaloguj się</button> }
            { !loggedIn && <button onClick={setPanel('register')}>Zarejestruj się</button> }
            { loggedIn && <button onClick={logout}>Wyloguj się</button> }
        </>
    )
}

export default MainPanel;
