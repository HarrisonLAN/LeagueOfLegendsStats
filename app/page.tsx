
'use client'
import Layout from './layout';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const makeApiCall = async (event) => {
    event.preventDefault()
    const data = {
      summonerID: event.target.summonerID.value,
    }
    const JSONdata = JSON.stringify(data)
    const response = await fetch('/api/getSummonerID', { method: 'POST', body: JSONdata })
  }

  return (
    <Layout {...pageProps}>
              <form className="" onSubmit={makeApiCall}>
          <div className="p-2 relative">
            <div className="w-99 m-auto py-1">
              <div className="bg-white rounded-lg border border-searchGrey">
                <div className="p-1">
                  <label className="flex text-xs" htmlFor="summonerID">
                    Summoner Name
                  </label>
                  <input className="font-bold w-full" id="summonerID" type="text" placeholder="Station name or code" />
                </div>
              </div>
            </div>
            <div className="w-99 py-1 m-auto">
              <div className="">
                <div className="flex items-end bg-searchBTN h-52 rounded-lg p-1 border border-searchGrey">
                  <button className="h-full flex-1 text-oangeColour font-bold text-left" type="submit">
                    Search
                  </button>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-full flex-none w-6 h-6 text-oangeColour ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>

                </div>
              </div>
            </div>
          </div>
        </form>

    </Layout>
  )
}
