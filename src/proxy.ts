import { type NextRequest, NextResponse } from 'next/server'
import { getUserSession } from './auth/core/session'
import { isAdminUser } from './features/organizations/permissions'
import { getOrgFromCache } from './features/organizations/server'

const guestRoutes = ['/', '/sign-in', '/sign-up']

function proxyRedirect(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone()
  url.pathname = pathname
  return NextResponse.redirect(url.toString())
}

function proxyNotFound() {
  return new NextResponse(null, { status: 404 })
}

export async function proxy(request: NextRequest) {
  const session = await getUserSession(request.cookies)

  const isGuestRoute = guestRoutes.includes(request.nextUrl.pathname)

  if (session && isGuestRoute) {
    return proxyRedirect(request, '/jobs')
  }

  if (!session && !isGuestRoute) {
    return proxyRedirect(request, '/sign-in')
  }

  if (session && !isGuestRoute) {
    // custom page protection

    const { pathname } = request.nextUrl

    /**
     * Match:
     * /company/{uri}
     * /company/{uri}/admin/...
     * /school/{uri}
     * /school/{uri}/admin/...
     */
    const match = pathname.match(/^\/(company|school)\/([^/]+)(\/admin.*)?$/)

    if (match) {
      const [, orgType, uri, adminPath] = match

      const { org, isID } = await getOrgFromCache(orgType, uri)

      if (!org) {
        return proxyNotFound()
      }

      const isAdminRoute = Boolean(adminPath)

      const prefix = `/${orgType}/${uri}`

      // if ADMIN route

      if (isAdminRoute) {
        const isAdmin = await isAdminUser(org.id, session.id)

        if (!isAdmin) {
          return proxyNotFound()
        }

        if (!isID) {
          const newPathname = `/${orgType}/${org.id}${pathname.slice(prefix.length)}`
          return proxyRedirect(request, newPathname)
        }
      } else if (isID) {
        const newPathname = `/${orgType}/${org.slug}${pathname.slice(prefix.length)}`
        return proxyRedirect(request, newPathname)
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
}
