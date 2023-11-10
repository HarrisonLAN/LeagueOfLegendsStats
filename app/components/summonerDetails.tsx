import { useState, useEffect, useMemo } from "react";

export default function SummonerDetails(summoner) {
    const [matchHistory, setMatchHistory] = useState();

    const makeApiCallOnMatchHistory = async () => {
        const data = {
            summonerID: summoner.data.puuid,
        }
        const JSONdata = JSON.stringify(data)
        const matchHistory = await fetch('/api/getMatchs', { method: 'POST', body: JSONdata })
        if (matchHistory.status === 200) {
            console.log(await matchHistory.json())
        }
    }

    const data = useMemo(() => {
        // not loaded yet?
        if (!summoner?.data) return [];
        makeApiCallOnMatchHistory();
    }, [summoner?.data]);

    const noData = data?.keys.length === 0;
    return (
        <div className="pb-2">
            {noData ? (
                <div className="py-2 w-11/12 m-auto">
                    <h1></h1>
                </div>
            ) : (
                <>
                    <div className="border-b border font-bold text-xl  m-auto h-auto text-center">
                        <h4 className="">Summoner</h4>
                        <h2>{summoner.data.name}</h2>
                        <h3>{summoner.data.summonerLevel}</h3>
                    </div>

                    <div className="lg:flex">

                        <ul className="lg:w-1/2 w-99 p-1">
                        </ul>

                    </div>
                </>
            )}

        </div>

    );
}