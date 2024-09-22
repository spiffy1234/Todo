import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup page - Spiffy App",
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
