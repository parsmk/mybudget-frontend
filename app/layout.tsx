import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import ApiClientProvider from "@/providers/ApiClientProvider";

export const metadata: Metadata = {
  title: "MyBudget",
  description: "Budgeting application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <ApiClientProvider>
          <body>{children}</body>
        </ApiClientProvider>
      </ReactQueryProvider>
    </html>
  );
}
