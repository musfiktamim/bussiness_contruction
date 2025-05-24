import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("desh_aurth_cookie")?.value

  if (!authCookie) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  try {
    // Call your authentication API
    const authResponse = await fetch(`${request.nextUrl.origin}/api/auth/verify`, {
      headers: {
        'Cookie': `desh_aurth_cookie=${authCookie}`
      }
    })

    if (!authResponse.ok) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    const { user } = await authResponse.json()

    // Clone headers and add user data
    
    const headers = new Headers(request.headers)
    headers.set('x-user', JSON.stringify(user))

    return NextResponse.next({ request: { headers } })
  } catch (error) {
    if(error instanceof Error)
      return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: ["/deshboard/:path*"],
}