// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "@/lib/auth";

const PROTECTED_PATHS = [
  { path: "/api/data/students/delete", roles: ["ADMIN", "SUPERADMIN"] },
  { path: "/api/data/faculties/delete", roles: ["ADMIN", "SUPERADMIN"] },
  { path: "/api/data/classes/delete", roles: ["ADMIN", "SUPERADMIN"] },
  { path: "/api/data/faculties/add", roles: ["ADMIN", "SUPERADMIN"] },
  { path: "/api/data/classes/add", roles: ["ADMIN", "SUPERADMIN"] },
  { path: "/api/data/students/add", roles: ["ADMIN", "SUPERADMIN"] },
  { path: "/api/auth/invintations/send", roles: ["ADMIN", "SUPERADMIN"] },
];

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;
  const method = request.method;

  const token = request.headers.get("Authorization")?.split(" ")[1];
  const verifiedToken = token && await verifyAuth(token).catch(console.error);

  if (pathname.includes("/api/auth/login")) {
    return verifiedToken
      ? NextResponse.redirect(new URL("/dashboard", request.url))
      : NextResponse.next();
  }

  if (pathname.includes("/api/auth/Register")) {
    return NextResponse.next();
  }


  if (!verifiedToken) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }


  for (const route of PROTECTED_PATHS) {
    if (pathname.startsWith(route.path)) {
      if (method === "DELETE" && !route.roles.includes(verifiedToken.role)) {
        console.log(`Access denied for ${verifiedToken.role}`);
        return NextResponse.json(
          { error: "Insufficient permissions" },
          { status: 403 }
        );
      }
    }
  }

  if (request.url.includes(`api/accounts/`) && request.method === "PUT") {
    if (verifiedToken.role !== "SUPERADMIN") {
      return NextResponse.json(
        { error: "Superadmin only route" },
        { status: 403 }
      );
    }
  }

  console.log(`Request Accepted for ${verifiedToken.role}`);
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"]
};