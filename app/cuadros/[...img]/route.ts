import { NextResponse } from "next/server";

export async function GET(request: Request, {params}: {params: {img: string}}) {
    const queryParams = new URLSearchParams(request.url.split('?')[1]);
    const url = 'https://gatica.sirv.com/public/cuadros/' + params.img + '?' + queryParams.toString();
    const img = await fetch(url ,{
        cache: 'force-cache'
    });
    const imgBuffer = await img.arrayBuffer();
    return new NextResponse(imgBuffer, {
        headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=31536000, immutable'
        }
    });
}
