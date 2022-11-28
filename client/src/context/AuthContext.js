import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext(null);

export const authReducer = (state, action) => {
    switch(action.type) {
        case 'login':
            return {
                accountId: action.payload?.user?.accountId,
                username: action.payload?.user?.username,
                isAdmin: action.payload?.user?.isAdmin,
                token: action.payload?.token
            };
        case 'logout':
            return { user: null };
        default:
            return state;
    }
}

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        accountId: null,
        username: null,
        isAdmin: null,
        token: null
    });

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));

        if (user) {
            dispatch({ type: 'login', payload: user});
        }
    }, []);

    console.log('AuthContext state: ', state);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}
