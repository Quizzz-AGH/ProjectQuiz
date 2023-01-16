import React, { createContext } from "react";
import { io } from "socket.io-client";

const socket = io("ws://localhost:5001"),
  SocketContext = createContext(socket);

// SocketProvider is a component that provides the socket context to the app
// the socket context is used to connect to the socket.io server
const SocketProvider = ({ children }) => {
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export { SocketContext, SocketProvider };
