import { NextResponse } from "next/server";

export async function GET(request: Request, {params}: {params: {img: string}}) {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')

    if (!url) {
        return new NextResponse('url is required', {
            status: 400
        })
    }
    
    const img = await fetch(url, {
        cache: 'force-cache'
    });

    if (img.status === 404) {
        return new NextResponse('Not found', {
            status: 404
        })
    }

    if (!img.headers.get('content-type')?.startsWith('image')) {
        return new NextResponse('Not an image', {
            status: 400
        })
    }

    const imgBuffer = await img.arrayBuffer();

    return new NextResponse(imgBuffer, {
        headers: {
            'Content-Type': img.headers.get('content-type') || 'image/png',
            'Cache-Control': 'public, max-age=31536000, immutable'
        }
    });
}
