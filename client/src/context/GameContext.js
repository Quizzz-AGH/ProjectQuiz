import {createContext, useState} from "react";

export const GameContext = createContext(null);

export const GameContextProvider = ({ children }) => {
    const [gameStreak, setGameStreak] = useState(false);
    const [gameState, setGameState] = useState(null);

    return (
        <GameContext.Provider value={{gameStreak, gameState, setGameStreak, setGameState}}>
            {children}
        </GameContext.Provider>
    )
}