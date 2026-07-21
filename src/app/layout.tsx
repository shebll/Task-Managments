import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/style/globals.css";
import QueryProvider from "@/providers/query-provider";
import { Toaster } from "sonner";
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
  openGraph: {
    title: "Taskly",
    description:
      "Taskly is a modern task and project management platform designed to help teams and individuals organize tasks, track progress, and boost productivity.",
    url: "https://taskly-gules.vercel.app/",
    siteName: "Taskly",
    images: [
      {
        url: "/assets/imgs/Cover.png", // public/og-image.png
        width: 1200,
        height: 630,
        alt: "Taskly - Task & Project Management Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Taskly",
    description:
      "Taskly is a modern task and project management platform designed to help teams and individuals organize tasks, track progress, and boost productivity.",
    images: ["/assets/imgs/Cover.png"],
  },

  alternates: {
    canonical: "https://taskly-gules.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistInter.variable} h-full antialiased`}>
      <body className="min-h-screen  bg-background text-foreground ">
        <QueryProvider>{children}</QueryProvider>
        <Toaster position="top-right" richColors closeButton duration={4000} />
      </body>
    </html>
  );
}
