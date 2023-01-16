import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext(null);

// authReducer is a reducer function that handles the state of the user
// the state of the user is stored in the sessionStorage
export const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        accountId: action.payload?.user?._id,
        name: action.payload?.user?.name,
        email: action.payload?.user?.email,
        role: action.payload?.user?.role,
        loggedIn: true,
      };
    case "logout":
      return { user: null };
    default:
      return state;
  }
};

// AuthProvider is a provider component that provides the state of the user to the children components
// the state of the user is stored in the sessionStorage
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    accountId: null,
    name: null,
    email: null,
    role: null,
    loggedIn: false,
  });

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (user) {
      dispatch({ type: "login", payload: user });
    }
  }, []);

  console.log("AuthContext state: ", state);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
