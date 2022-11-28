import React from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useLogout } from "../../hooks/useLogout";

function MainPanel({setPanel}) {

    const navigate = useNavigate();
    const { isAdmin, token } = useAuth();
    const { logout } = useLogout();

    return (
        <>
            <button onClick={setPanel('lobby')}>Graj</button>
            { token && <button>Historia</button> }
            <button>Ranking</button>
            { isAdmin && <button onClick={() => navigate('/admin')}>Administracja</button> }
            { !token && <button onClick={setPanel('login')}>Zaloguj się</button> }
            { !token && <button onClick={setPanel('register')}>Zarejestruj się</button> }
            { token && <button onClick={logout}>Wyloguj się</button> }
        </>
    )
}

export default MainPanel;
