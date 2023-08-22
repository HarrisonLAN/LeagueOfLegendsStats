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
            method: 'GET', // or 'POST', 'PUT', etc.
            headers: headers,
            // Other options like body, credentials, etc. can be added here

        });
        const services = await response.json();
        console.log(services)
        return new NextResponse(JSON.stringify(services))
    } catch (error) {
        console.error('Fetch error:', error);
    }
}