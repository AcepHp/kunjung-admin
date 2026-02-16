import { NextRequest, NextResponse } from "next/server";
import { auth } from "./libs/auth";

export async function middleware(req: NextRequest) {
  const data = await auth();
  const { pathname } = req.nextUrl;

  // BELUM LOGIN tapi buka halaman dashboard (/beranda atau sub-pathnya)
  if (!data && pathname.startsWith("/beranda")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // SUDAH LOGIN tapi buka LOGIN PAGE (/)
  if (data && pathname === "/") {
    return NextResponse.redirect(new URL("/beranda", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};