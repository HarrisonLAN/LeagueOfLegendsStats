import { useState, useEffect, useMemo } from "react";
export default function SummonerDetails(summoner) {

        const data = useMemo(() => {
            // not loaded yet?
            if (!summoner?.data) return [];
            const puuid = summoner.data.puuid;

        }, [summoner?.data]);

        const noData = data?.keys.length === 0;

        return (
            <div className="pb-2">
                {noData ? (
                    <div className="py-2 w-11/12 m-auto">
                        <h1> Enter Summoner Name</h1>
                    </div>
                ) : (
                    <>
                        <div className="border-b border font-bold text-xl  m-auto h-auto text-center">
                            <h4 className="">Summoner</h4>
                            <h2>{summoner.data.name}</h2>
                            <h3>{summoner.data.summonerLevel}</h3>
                        </div>
                        <div className="lg:flex">
          
                        </div>
                    </>
                )}
            </div>
        );
    }