import { useState, useEffect, useMemo } from "react";
import Match from "./match";

export default function SummonerDetails(summoner) {
    const [matches, setMatches] = useState([]);
    const [counter, setCounter] = useState(0);
    const [loaded, setLoaded] = useState(false);

    const requestMatchDetails = async () => {
        const data = {
            summonerID: summoner.data.puuid,
            counter
        }
        const JSONdata = JSON.stringify(data)
        const res = await fetch('api/getMatchs', { method: 'POST', body: JSONdata })
        if (res.status === 200) {
            const matchList = await res.json();
            const mergeResult = [...matches, ...matchList];
            setMatches(mergeResult)
            setCounter(counter + 10);
        }
    }
    const loadMoreMatches = () => {
        if (counter < 91) requestMatchDetails()
    };

    const data = useMemo(() => {
        // not loaded yet?
        if (!summoner?.data) return [];
    }, [summoner?.data]);

    const noData = data?.keys.length === 0  && matches.length === 0;
    if (!loaded && !noData) {
        setLoaded(true);
        requestMatchDetails();

    }
    return (
        <div className="pb-2">
            {noData ? (
                <div className="py-2 w-11/12 m-auto">
                    <h1>{ }</h1>
                </div>
            ) : (
                <>
                    <div className="border-b border font-bold text-xl  m-auto h-auto text-center">
                        <h4 className="">Summoner</h4>
                        <h2>{summoner.data.name}</h2>
                        <button type="button" onClick={loadMoreMatches}>Button</button>
                    </div>

                    <div className="lg:flex">
                        <ul className="lg:w-1/2 w-99 p-1">
                             {matches?.map((match) => (
                                <Match data={match} key={match} />
                            ))}
                        </ul>
                    </div>
                </>
            )}

        </div>
    );
}