import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  if (token) {
    if (new Date(token.expiresIn!) <= new Date()) {
      if (
        req.nextUrl.pathname.startsWith('/login') ||
        req.nextUrl.pathname.startsWith('/register')
      ) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    } else {
      if (
        req.nextUrl.pathname.startsWith('/login') ||
        req.nextUrl.pathname.startsWith('/register')
      ) {
        return NextResponse.redirect(new URL('/', req.url));
      } else {
        return NextResponse.next();
      }
    }
  } else {
    if (
      req.nextUrl.pathname.startsWith('/login') ||
      req.nextUrl.pathname.startsWith('/registration')
    ) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|static|favicon.ico|_next|logo.svg).*)',
  ],
};
