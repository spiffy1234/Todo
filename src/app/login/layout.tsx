import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login page - Spiffy App",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
