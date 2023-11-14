'use client'
import type { AppProps } from 'next/app';
import Search from './components/search'
import SummonerDetails from './components/summonerDetails'
import { useState, useEffect } from 'react';

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

import Layout from './layout';

export default function App({ Component, pageProps }: AppProps) {
  const [summoner, setSummoner] = useState();


  return (  
    <Layout {...pageProps}>
      <Search onChange={setSummoner} />
      <SummonerDetails data={summoner} />
    </Layout>
  )
}