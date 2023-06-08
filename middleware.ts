import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {


    // if (!request.cookies.has('token')) {
    //     return NextResponse.redirect(new URL('/', request.url));
    // }

    const response = NextResponse.next();

    response.cookies.set({
      name: 'cartId',
      value: '1234567',
      secure: true,
      httpOnly: true,
      path: '/',
    });

    return response
  }
   
  // // See "Matching Paths" below to learn more
  // export const config = {
  //   matcher: '/user/:path*',
  // };