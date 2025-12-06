import { type NextRequest, NextResponse } from 'next/server'
import { getUserSession } from './auth/core/session'

const guestRoutes = ['/', '/sign-in', '/sign-up']

export async function proxy(request: NextRequest) {
  const session = await getUserSession(request.cookies)

  const isGuestRoute = guestRoutes.includes(request.nextUrl.pathname)

  if (session && isGuestRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/jobs'
    return NextResponse.redirect(url.toString())
  }

  if (!session && !isGuestRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/sign-in'
    return NextResponse.redirect(url.toString())
  }
  if (session && !isGuestRoute) {
    // custom page protection
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
}
