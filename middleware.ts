import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import useAuth from './hooks/useAuth';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // If the user is not logged in, redirect to the login page
  
}

export const config = {
  matcher: ['/((?!login|register))'],
};