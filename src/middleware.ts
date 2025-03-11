// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyAuth } from "@/lib/auth";

export async function middleware(request: NextRequest) {

  const authHeader = request.headers.get('Authorization')
  console.log(authHeader)
  const token = authHeader?.split(' ')[1]
  console.log(authHeader)
  const verifiedToken =
    token && (await verifyAuth(token).catch((err) =>{ console.error(err)}))



  if (request.nextUrl.pathname.startsWith('api/auth/login') && !verifiedToken) {
    return
  }


  console.log('API Route Token:', token)

  if(request.url.includes(`api/auth/login`) && verifiedToken){
    console.log(`dashboard redirect`)
    return NextResponse.redirect(new URL(`/dashboard`, request.url))
  }


  if (!verifiedToken) {
    console.log(`login redirect `);
    return NextResponse.error()
  }

  //FUNDI!!!!!!!
console.log(`end is being read`)
  return NextResponse.next()
}

export const config = {
  matcher: [`/api/:path` ,`/api/data/:path`]
}