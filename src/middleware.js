import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth_token')?.value;

  // Solo procesar rutas que empiecen con /admin
  if (pathname.startsWith('/admin')) {
    
    // Si no hay token, redirigir a login
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    try {
      // Importante: El secreto debe estar en las variables de entorno de Vercel
      const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      console.error("Middleware Error:", error);
      // Si el token es inválido, borrar cookie y mandar a login
      const response = NextResponse.redirect(new URL('/auth/login', request.url));
      response.cookies.delete('auth_token');
      return response;
    }
  }

  // Para todas las demás rutas (públicas, auth, etc.), dejar pasar
  return NextResponse.next();
}

// Esta configuración es CRITICA para evitar el Client-side Exception
export const config = {
  matcher: [
    /*
     * Match todas las rutas que empiecen con /admin
     * PERO excluye explícitamente archivos estáticos y rutas de Next.js
     */
    '/admin/:path*',
  ],
};