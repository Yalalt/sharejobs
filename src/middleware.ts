import { NextRequest, NextResponse } from "next/server";


export async function middleware(request: NextRequest) {
   try {
    const isPublicPage = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register';

    // if there is not token and page is not public, redirect to login
    const token = request.cookies.get('__session-sharejobs');
    if(!token && !isPublicPage) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    // If there is token and page is public, redirect to home
    if (token && isPublicPage) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    return NextResponse.next();
   } catch (error: any) {
        return NextResponse.error();
   }
}

export const config = {
    matcher: ['/', '/login', '/register']
}