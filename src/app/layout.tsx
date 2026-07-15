import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/style/globals.css";
import QueryProvider from "@/providers/ QueryProvider";

const geistInter = Inter({
  variable: "--font-geist-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Taskly",
    template: " %s | Taskly",
  },
  description:
    "Taskly is a modern task and project management platform designed to help teams and individuals organize tasks, track progress, and boost productivity.",
  keywords: [
    "Taskly",
    "Task Management",
    "Project Management",
    "Productivity App",
    "Team Collaboration",
    "ToDo App",
    "Kanban Board",
    "Next.js",
  ],
  creator: "Ahmed Mohamed",
  authors: [{ name: "Ahmed Shebl", url: "https://ahmedshebl.vercel.app/" }],
  icons: {
    icon: "/assets/icons/icon.svg",
    apple: "/assets/icons/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistInter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground max-w-7xl m-auto pr-6 md:pr-10 pl-6 md:pl-10">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
