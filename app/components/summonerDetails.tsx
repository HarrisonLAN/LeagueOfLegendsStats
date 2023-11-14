import { useState, useEffect, useMemo } from "react";
import Match from "./match";
import React from 'react'
import {
    useQuery,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
    keepPreviousData,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()
export default function SummonerDetails(summoner) {
    return (
        <QueryClientProvider client={queryClient}>
            <Example data={summoner} />
        </QueryClientProvider>
    )
}

async function fetchProjects(summoner,page = 0) {
    console.log(summoner)
    const summonerData = {
        summonerID: summoner.data.data.puuid,
        page
    }
    const JSONdata = JSON.stringify(summonerData)
    const { data } = await fetch('api/getMatchs', { method: 'POST', body: JSONdata })
    console.log(data)
    return data;
}

function Example(summoner) {
    const queryClient = useQueryClient()
    const [page, setPage] = React.useState(0)
    if(summoner.data.data === undefined) {return( <></>)}else{
    const { status, data, error, isFetching, isPlaceholderData } = useQuery({
        queryKey: ['projects', page],
        queryFn: () => fetchProjects(summoner,page),
        placeholderData: keepPreviousData,
        staleTime: 5000,
    })

    // Prefetch the next page!
    React.useEffect(() => {
        if (!isPlaceholderData && data?.hasMore) {
            queryClient.prefetchQuery({
                queryKey: ['projects', page + 1],
                queryFn: () => fetchProjects(page + 1),
            })
        }
    }, [data, isPlaceholderData, page, queryClient])

    return (
        <div>
            {status === 'pending' ? (
                <div>Loading...</div>
            ) : status === 'error' ? (
                <div>Error: {error.message}</div>
            ) : (
                // `data` will either resolve to the latest page's data
                // or if fetching a new page, the last successful page's data
                <div>
                    {data.projects.map((project) => (
                        <p key={project.id}>{project.name}</p>
                    ))}
                </div>
            )}
            <div>Current Page: {page + 1}</div>
            <button
                onClick={() => setPage((old) => Math.max(old - 1, 0))}
                disabled={page === 0}
            >
                Previous Page
            </button>{' '}
            <button
                onClick={() => {
                    setPage((old) => (data?.hasMore ? old + 1 : old))
                }}
                disabled={isPlaceholderData || !data?.hasMore}
            >
                Next Page
            </button>
            {
                // Since the last page's data potentially sticks around between page requests,
                // we can use `isFetching` to show a background loading
                // indicator since our `status === 'pending'` state won't be triggered
                isFetching ? <span> Loading...</span> : null
            }{' '}
            <ReactQueryDevtools initialIsOpen />
        </div>
    )
}
}
