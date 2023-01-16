import { useAuth } from "./useAuth";

// useLogout is a custom hook that returns the logout function
// the logout function is used to logout the user
export const useLogout = () => {
  const { dispatch } = useAuth();

  const logout = () => {
    sessionStorage.removeItem("user");
    dispatch({ type: "logout" });
  };

  return { logout };
};
