import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import ApiClientProvider from "@/providers/ApiClientProvider";

export const metadata: Metadata = {
  title: "MyBudget",
  description: "Budgeting application.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <ApiClientProvider>{children}</ApiClientProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
