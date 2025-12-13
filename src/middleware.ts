// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;

  if (token && req.nextUrl.pathname === "/login") {
    try {
      // Cek token valid dan expired
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      // Token valid → redirect ke dashboard/homepage
      return NextResponse.redirect(new URL("/", req.url));
    } catch (err) {
      // Token expired / invalid → hapus cookie & tetap bisa akses login
      const res = NextResponse.next();
      res.cookies.set("jwt", "", { maxAge: 0 });
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login"], // middleware hanya jalan di /login
};
