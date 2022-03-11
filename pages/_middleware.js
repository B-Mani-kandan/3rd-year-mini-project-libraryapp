import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

const secret = "arunmani";

export default function middleware(req) {
  const { cookies } = req;

  const jwt = cookies.OursiteJWT;

  const url = req.url;

  let pathname = req.nextUrl.clone().pathname;

  if (pathname === "/") {
    if (jwt) {
      try {
        verify(jwt, secret);
        const url = req.nextUrl.clone();
        url.pathname = "/dashboard";
        return NextResponse.rewrite(url);
      } catch (e) {
        return NextResponse.next();
      }
    }
  }

  if (url.includes("/dashboard")) {
    if (!jwt) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.rewrite(url);
    }
    try {
      verify(jwt, secret);

      return NextResponse.next();
    } catch (e) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.rewrite(url);
    }
  }
  return NextResponse.next();
}
