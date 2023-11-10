import { NextResponse, NextRequest } from "next/server";

require('dotenv').config()

export async function POST(req: NextRequest) {
    const key = process.env.API_KEY
    const auth = process.env.AUTH
    const headers = new Headers();
    headers.append(auth, key);
    const body = await req.json();

    try {
        const response = await fetch('https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/' + body.summonerID + '/ids?start=0&count=10', {
            method: 'GET', // or 'POST', 'PUT', etc.
            headers: headers,
            // Other options like body, credentials, etc. can be added here

        });
        const smnMatchs = await response.json();
        return new NextResponse(JSON.stringify(smnMatchs))
    } catch (error) {
        console.error('Fetch error:', error);
    }

} 
