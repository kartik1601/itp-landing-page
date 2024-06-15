import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/' || path === '/login' || path ==='/signup' || path === '/verifyemail'

    const token = request.cookies.get("token")?.value || ''

    if (isPublicPath && token){
        return NextResponse.redirect(new URL('/home', request.url))
    }

    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next();
}
 

export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/home',
    '/verifyemail',
    '/bill-of-materials',
    '/wire-coloring-code',
  ]
}