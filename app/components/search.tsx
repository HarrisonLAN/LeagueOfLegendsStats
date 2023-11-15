import { useState, useEffect, useMemo } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
    export default function Search({ onChange }) {
      const [summonerId, setSummonerId] = useState(undefined);
      const makeApiCallOnSMNID = async (event) => {
        event.preventDefault()
        setSummonerId(event.target.summonerID.value)
        if(summonerId === event.target.summonerID.value){
          refetch();
        }
      }
      const { refetch,isPending, error, data ,isSuccess,status} = useQuery({
        queryKey: ['repoData'],
        enabled: summonerId != undefined,
        queryFn: () =>
          fetch('/api/getSummonerID', { method: 'POST', body: JSON.stringify( {summonerID: summonerId}) 
        }).then(
            (res) => res.json(),
          ),
      })
      if(isSuccess){
        if(data.error){
        }else if(data?.name !== "Undefined"){
          onChange(data)
        }
      }
      return (
        <div className="main-container p-1 md:p-5 bg-searchBG border-b-2 border-searchGrey">
          <div className="content-container w-11/12 rounded-lg m-auto text-lg bg-searchBG">
            <form className="" onSubmit={makeApiCallOnSMNID}>
              <div className="p-2 relative">
                <div className="w-99 m-auto py-1">
                  <div className="bg-white rounded-lg border border-searchGrey">
                    <div className="p-1">
                      <label className="flex text-xs" htmlFor="summonerID">
                        Summoner Name
                      </label>
                      <input className="font-bold w-full" id="summonerID" type="text" placeholder="Summoner ID" />
                    </div>
                  </div>
                </div>

                <div className="w-99 py-1 m-auto">
                  <div className="">
                    <div className="flex items-end bg-searchBTN h-12 rounded-lg p-1 border border-searchGrey">
                      <button className="h-full flex-1 text-oangeColour font-bold text-left" type="submit">
                        Search Summoner
                      </button>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-full flex-none w-6 h-6 text-oangeColour ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>

                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div >
        </div >
      )
    }