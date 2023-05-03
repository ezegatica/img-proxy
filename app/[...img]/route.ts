import { NextResponse } from "next/server";

export async function GET(_request: Request, {params}: {params: {img: string}}) {
    const img = await fetch('https://gatica.sirv.com/img/' + params.img);
    const imgBuffer = await img.arrayBuffer();
    return new NextResponse(imgBuffer, {
        headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=31536000, immutable'
        }
    });
}
