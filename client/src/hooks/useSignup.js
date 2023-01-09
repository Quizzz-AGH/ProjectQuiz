import { useState } from "react";
import { useAuth } from "./useAuth";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuth();

    const signup = async (username, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/accounts/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        } else {
            sessionStorage.setItem('user', JSON.stringify(json));
            dispatch({ type: 'login', payload: json });
            setIsLoading(false);
        }
    }

    return { signup, isLoading, error };
}