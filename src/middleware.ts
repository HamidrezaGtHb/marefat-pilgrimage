/**
 * Next.js Middleware
 *
 * Protects admin routes by checking authentication status.
 * Redirects unauthenticated users to login page.
 */

export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    // Protect all admin routes except login page
    "/admin/((?!login).*)",
    "/api/admin/:path*",
  ],
};
