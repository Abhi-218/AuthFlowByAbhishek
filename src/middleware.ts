import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname

      console.log("path === ",path)
    const publicUrls = path === '/login' || path === '/register' || path === '/verifyemail';

    const token = request.cookies.get("token")?.value || '';

    console.log("token ===", token)
    console.log("public urls === ", publicUrls)

    if (publicUrls && token) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl))
    }
    if (!publicUrls && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/register', '/verifyemail', '/login', '/profile'],
}