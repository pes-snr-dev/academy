"use client";

import { SessionProvider } from "next-auth/react";

const NextSessionProvider = ({ children, session }) => (
  <SessionProvider session={session}>{children}</SessionProvider>
);

export default NextSessionProvider;
