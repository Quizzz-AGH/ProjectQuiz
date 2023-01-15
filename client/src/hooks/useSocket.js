import { SocketContext } from "../context/SocketContext";
import { useContext } from "react";

export const useSocket = () => {
    const context = useContext(SocketContext);

    if (!context) {
        throw Error('useSocket must be inside SocketProvider');
    }

    return context;
}
