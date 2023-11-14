import { error } from "console";
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
        console.log(response)
        if(response.status === 200){
            const Summoner = await response.json();
            return new NextResponse(JSON.stringify(Summoner))
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
