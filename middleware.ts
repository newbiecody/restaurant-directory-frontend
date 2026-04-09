import { type NextRequest, NextResponse } from "next/server";

const PROTECTED_PATHS = [
  "/user/overview",
  "/bookmarked",
  "/dish/new",
  "/blog/new",
];

const PROTECTED_DYNAMIC_PATTERNS = [/^\/dish\/\d+\/review$/];

const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME ?? "JSESSIONID";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected =
    PROTECTED_PATHS.some((p) => pathname.startsWith(p)) ||
    PROTECTED_DYNAMIC_PATTERNS.some((re) => re.test(pathname));

  if (isProtected && !request.cookies.has(SESSION_COOKIE_NAME)) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("returnTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
