// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  console.log(authHeader);
  const token = authHeader?.split(" ")[1];
  console.log(token);
  const verifiedToken =
    token &&
    (await verifyAuth(token).catch((err) => {
      console.error(err);
    }));

  if (authHeader === `Bearer ${null}`) {
    console.log("No token provided");
    return NextResponse.json({ error: "No Token Provided" }, { status: 401 });
  }

  if (request.nextUrl.pathname.startsWith("api/auth/login") && !verifiedToken) {
    return NextResponse.next();
  }

  console.log("API Route Token:", token);

  if (request.url.includes(`api/auth/login`) && verifiedToken) {
    console.log(`dashboard redirect`);
    return NextResponse.redirect(new URL(`/dashboard`, request.url));
  }

  if (!verifiedToken) {
    console.log(`login redirect `);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 401 },
    );
  }


  console.log(`Request Accepted`);
  return NextResponse.next();
}

export const config = {
  matcher: [`/api/:path`, `/api/data/:path`],
};
