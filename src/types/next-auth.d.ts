/**
 * Type definitions for NextAuth.js
 * Extends the default Session and User types to include custom fields
 */

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Extends the built-in session type
   */
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  /**
   * Extends the built-in user type
   */
  interface User {
    id: string;
    email: string;
    name?: string | null;
    role: string;
  }
}

declare module "next-auth/jwt" {
  /**
   * Extends the built-in JWT type
   */
  interface JWT {
    id: string;
    role: string;
  }
}
