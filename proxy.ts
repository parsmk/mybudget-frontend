import { NextRequest, NextResponse } from "next/server";
import { ROUTES } from "./app/_route-map";

const proxy = (request: NextRequest) => {
  console.log(request.cookies.get("accessToken"));
  if (!request.cookies.has("accessToken")) {
    return NextResponse.redirect(new URL(ROUTES.HOME, request.nextUrl));
  }

  return NextResponse.next();
};

export default proxy;

export const config = {
  matcher: "/dashboard/:path*",
};
