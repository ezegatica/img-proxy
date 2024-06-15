import { NextResponse } from "next/server";

export async function GET(_request: Request) {
   // proxy to https://gatica.sirv.com/public/cuadros and return its html
    const response = await fetch('https://gatica.sirv.com/public/cuadros');
    const html = await response.text();
    // replace all instances of "gatica.sirv.com/public/cuadros/" with "cuadros/"
    const replacedHtml = html.replace(/gatica.sirv.com\/public\/cuadros\//g, 'i.ezegatica.com/cuadros/');
    return new NextResponse(replacedHtml, {
        headers: {
            'Content-Type': 'text/html',
            'Cache-Control': 'public, max-age=0, must-revalidate'
        }
    });
}
