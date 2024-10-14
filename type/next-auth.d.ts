// types/next-auth.d.ts

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email?: string | null;
    };
  }

  interface User {
    id: string;
    name: string;
    email?: string | null;
  }
}
