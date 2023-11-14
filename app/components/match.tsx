import { useState, useEffect, useMemo } from "react";
export default function MatchHistory(matchID) {
    const [loaded, setLoaded] = useState(false);
    const [match, setMatch] = useState();


    const makeApiCallOnMatchID = async () => {
        const data = {
            matchID: matchID.data,
        }
        const JSONdata = JSON.stringify(data)
        const matchRes = await fetch('/api/getMatch', { method: 'POST', body: JSONdata })
        if (matchRes.status === 200) {
            const match = await matchRes.json();
            console.log(match)
            setMatch(match)
        }
    }

    if (!loaded) {
        setLoaded(true);
        makeApiCallOnMatchID();
    }
    const data = match === undefined
    
    return (
        <>
            {data ? (

                <> </>
            ) : (
                <>
                    <div className="py-2 w-11/12 m-auto">
                        <h1>{match.info.gameId}</h1>
                    </div>
                </>
            )}

        </>
    );
}