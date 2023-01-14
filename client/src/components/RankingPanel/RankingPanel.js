import React, {useEffect, useState} from "react";

function RankingPanel({setPanel}) {

    const [ranking, setRanking] = useState([]);

    useEffect(() => {
        async function getRanks() {
            const response = await fetch('/rankings', {
                method: "GET"
            });

            if (!response.ok) {
                window.alert(`An error occurred: ${response.statusText}`);
                return;
            }

            const ranks = await response.json();
            setRanking(ranks.rankings);
        }

        getRanks();
    }, []);

    function rankList() {
        return ranking.map((record, index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{record?.user}</td>
                    <td>{record?.rankingScore}</td>
                    <td>{record?.gamesWon}</td>
                </tr>
            );
        });
    }

    return (
        <>
            <button onClick={setPanel('main')}>Powrót</button>
            <table>
                <thead>
                <tr>
                    <th>Pozycja</th>
                    <th>Gracz</th>
                    <th>Punkty</th>
                    <th>Wygrane</th>
                </tr>
                </thead>
                <tbody>
                {rankList()}
                </tbody>
            </table>
        </>
    )
}

export default RankingPanel;
