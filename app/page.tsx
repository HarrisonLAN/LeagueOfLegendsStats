'use client'
import type { AppProps } from 'next/app';
import Search from './components/search'
import SummonerDetails from './components/summonerDetails'
import { useState, useEffect } from 'react';

import Layout from './layout';
import MatchHistory from './components/matchHistory';


export default function App({ Component, pageProps }: AppProps) {
  const [summoner, setSummoner] = useState();
  const [matchHistory, setMatchHistory] = useState();

  return (  
    <Layout {...pageProps}>
      <Search onChange={setSummoner} />
      <SummonerDetails onChange={setMatchHistory} data={summoner} />
    </Layout>
  )
}