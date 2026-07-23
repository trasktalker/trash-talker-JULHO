// src/middleware.ts
import { type NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  // Obtém a sessão usando o client auth (forma mais atualizada)
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isLoggedIn = !!session?.user;
  const pathname = request.nextUrl.pathname;

  // Regra 1: Dashboard sem login → redireciona para /login
  if (pathname.startsWith("/dashboard") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Regra 2: Home com login → redireciona para /dashboard
  if (pathname === "/" && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Qualquer outro caso: segue normalmente
  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: ["/", "/dashboard/:path*"], // Rotas abrangidas
};
