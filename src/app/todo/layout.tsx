import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todo page - Spiffy App",
};

export default function TodoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
