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



        if(response.status === 200){
            const match = await response.json();
            return new NextResponse(JSON.stringify(match))
        }
        if(response.status === 403){
            return NextResponse.json({ error: '403 Forbidden response status code' }, { status: 403 })
        }else{
            return NextResponse.json({ error: response.type }, { status: response.status })
        }

    } catch (error) {
        console.error('Fetch error:', error);
    }

} 
