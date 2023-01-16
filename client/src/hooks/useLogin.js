import { useState } from "react";
import { useAuth } from "./useAuth";

// useLogin is a custom hook that returns the login function, the isLoading state and the error state
// the login function is used to login the user
// the isLoading state is used to show a loading spinner
// the error state is used to show an error message
export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuth();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/authentication/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    } else {
      sessionStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "login", payload: json });
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
