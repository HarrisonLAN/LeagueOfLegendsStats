import { useState, useEffect, useMemo } from "react";
export default function MatchHistory(matchID) {
    let counter = 1
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
            setMatch(match)
        }
    }

    if (!loaded) {
        if(match === undefined){
            makeApiCallOnMatchID();
        }
        setLoaded(true);
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