import { useState, useEffect, useMemo } from "react";
export default function MatchHistory(matchID) {
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
            console.log(match)
        }
    }
    makeApiCallOnMatchID();
    return (
        <>
        </>
    );
}