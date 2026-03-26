import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Urban Tour — Urban News on PPP TV Kenya",
  description: "High School Talent Search — Admin Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
