import { SocketContext } from "../context/SocketContext";
import { useContext } from "react";

// useSocket is a custom hook that returns the context of the SocketContext
// the SocketContext is used to connect to the socket.io server
export const useSocket = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw Error("useSocket must be inside SocketProvider");
  }

  return context;
};
