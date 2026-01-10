import { NextRequest, NextResponse } from "next/server";
import { auth } from "./libs/auth";

export async function middleware(req: NextRequest) {
  const data = await auth();
  const { pathname } = req.nextUrl;

  //SUDAH LOGIN tapi buka LOGIN PAGE (/)
  if (data && pathname === "/") {
    return NextResponse.redirect(new URL("/beranda", req.url));
  }

  //BELUM LOGIN tapi buka halaman selain LOGIN PAGE
  if (!data && pathname !== "/") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}