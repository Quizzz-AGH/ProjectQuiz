import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

// useAuth is a custom hook that returns the context of the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuth must be inside AuthProvider");
  }

  return context;
};
