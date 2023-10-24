import { NextResponse, NextRequest } from "next/server";

require('dotenv').config()

export async function POST(req: NextRequest) {
    const key = process.env.API_KEY
    const auth = process.env.AUTH
    const headers = new Headers();
    headers.append(auth, key);
    const body = await req.json();

    try {
        const response = await fetch('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + body.summonerID, {
            method: 'GET', 
            headers: headers,
  

        });
        const Summoner = await response.json();
        return new NextResponse(JSON.stringify(Summoner))
    } catch (error) {
        console.error('Fetch error:', error);
    }
} 
