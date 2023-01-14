import React, {useEffect, useState} from "react";

function HistoryPanel({setPanel}) {

    const [games, setGames] = useState([])

    useEffect(() => {
        async function getGames() {
            const response = await fetch('/history/getMyHistory', {
                method: "GET"
            });

            if (!response.ok) {
                window.alert(`An error occurred: ${response.statusText}`);
                return;
            }

            const games = await response.json();
            setGames(games.gameHistory);
        }

        getGames();
    }, [games.length]);

    function gameList() {
        return games?.map((record) => {
            return (
                <tr>
                    <td>{record.type}</td>
                    <td>{record.opponentId}</td>
                    <td>{record.length}</td>
                    <td>{record.result}</td>
                </tr>
            );
        });
    }

    return (
        <>
            <button onClick={setPanel('main')}>Powrót</button>
            {games.length === 0 ?
                <div>Nie rozegrałeś żadnej gry w ostatnim czasie.</div>
                :
                <table>
                    <thead>
                    <tr>
                        <th>Typ</th>
                        <th>Przeciwnik</th>
                        <th>Długość</th>
                        <th>Wynik</th>
                    </tr>
                    </thead>
                    <tbody>
                    {gameList()}
                    </tbody>
                </table>
            }
        </>
    )
}

export default HistoryPanel;
