import { useState } from "react";
import { useAuth } from "./useAuth";

// useSignup is a custom hook that returns the signup function, the isLoading state and the error state
// the signup function is used to signup the user
// the isLoading state is used to show a loading spinner
// the error state is used to show an error message
export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuth();

  const signup = async (username, email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/authentication/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
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

  return { signup, isLoading, error };
};
