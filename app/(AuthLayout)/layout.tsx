import React, { ReactNode } from "react";

interface RootLayoutProps {

  children: ReactNode;
}

export default async function AuthLayout({ children }: RootLayoutProps) {
  return <div className="pt-10 lg:pt-0">{children}</div>;
}
