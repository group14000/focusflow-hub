import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Personalized Productivity Dashboard - Boost Your Daily Efficiency",
  description: "Discover a smart productivity dashboard tailored to your unique goals. Manage tasks, track habits, set reminders, and integrate with popular tools like Google Calendar. Boost your efficiency with an intuitive and fully customizable experience, designed for seamless performance across all devices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Sidebar />
          {children}
        </body>
      </html>
    </ClerkProvider>

  );
}
