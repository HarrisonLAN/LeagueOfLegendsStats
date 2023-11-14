import { NextResponse, NextRequest } from "next/server";

require('dotenv').config()

export async function POST(req: NextRequest) {
    const key = process.env.API_KEY
    const auth = process.env.AUTH
    const headers = new Headers();
    headers.append(auth, key);
    const body = await req.json();

    try {
        const response = await fetch('https://europe.api.riotgames.com/lol/match/v5/matches/' + body.matchID, {
            method: 'GET', // or 'POST', 'PUT', etc.
            headers: headers,
            // Other options like body, credentials, etc. can be added here

        });
        const match = await response.json();
        return new NextResponse(JSON.stringify(match))
    } catch (error) {
        console.error('Fetch error:', error);
    }

} 
