import React, { createContext} from "react";
import { io } from 'socket.io-client';

const socket = io('ws://localhost:5001'), SocketContext = createContext(socket);

const SocketProvider = ({ children }) => {
    return (
        <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    );
}

export { SocketContext, SocketProvider };
