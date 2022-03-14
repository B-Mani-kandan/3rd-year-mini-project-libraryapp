import { NextResponse } from "next/server";
// import { verify } from "jsonwebtoken";

const secret = "arunmani";

export default async function middleware(req) {
  const { cookies } = req;

  const jwt = require("@tsndr/cloudflare-worker-jwt");

  const token = cookies.OursiteJWT;

  const url = req.url;

  let pathname = req.nextUrl.clone().pathname;

  if (pathname === "/") {
    if (token) {
      try {
        await jwt.verify(token, secret);

        const payload = jwt.decode(token);

        if (payload.Admin) {
          const url = req.nextUrl.clone();
          url.pathname = "/admin";
          return NextResponse.rewrite(url);
        } else {
          const url = req.nextUrl.clone();
          url.pathname = "/dashboard";
          return NextResponse.rewrite(url);
        }
      } catch (e) {
        return NextResponse.next();
      }
    }
  }

  if (url.includes("/admin")) {
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.rewrite(url);
    }
    try {
      const payload = jwt.decode(token);

      if (payload.Admin) {
        return NextResponse.next();
      } else {
        const url = req.nextUrl.clone();
        url.pathname = "/dasboard";
        return NextResponse.rewrite(url);
      }
    } catch (e) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.rewrite(url);
    }
  }

  if (url.includes("/dashboard")) {
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.rewrite(url);
    }
    try {
      //     let ID =  verify(jwt, secret);
      const payload = jwt.decode(token);

      if (payload.Admin) {
        const url = req.nextUrl.clone();
        url.pathname = "/admin";
        return NextResponse.rewrite(url);
      } else {
        return NextResponse.next();
      }
    } catch (e) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.rewrite(url);
    }
  }
  return NextResponse.next();
}
