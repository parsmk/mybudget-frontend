import { NextRequest, NextResponse } from "next/server";
import { ROUTES } from "./app/_route-map";

const proxy = async (request: NextRequest) => {
  if (request.cookies.has("accessToken")) return NextResponse.next();

  const refresh = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/refresh`, {
    method: "POST",
    headers: {
      cookie: request.headers.get("cookie") ?? "",
    },
  });

  if (!refresh.ok)
    return NextResponse.redirect(new URL(ROUTES.HOME, request.nextUrl));

  const response = NextResponse.next();
  const setCookie = refresh.headers.get("set-cookie");
  if (setCookie) {
    response.headers.append("set-cookie", setCookie);
  }

  return response;
};

export default proxy;

export const config = {
  matcher: "/portal/:path*",
};
