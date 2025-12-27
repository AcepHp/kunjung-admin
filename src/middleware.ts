import { NextRequest, NextResponse } from "next/server";
import { auth } from "./libs/auth";

export async function middleware(req: NextRequest) {
  const data = await auth();

  if (data && req.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}