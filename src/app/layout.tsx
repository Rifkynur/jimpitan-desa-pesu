import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/app-sidebar";
import Container from "@/components/common/container";
import AppNavbar from "@/components/common/app-navbar";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/lib/providers";
import CheckAuth from "@/lib/checkAuth";

const InterSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jimpitan Desa Pesu",
  description: "Aplikasi tracking jimpitan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${InterSans.variable}  antialiased bg-dashboard-background text-clr-silver-v1`}
      >
        <Providers>
          <CheckAuth />
          <SidebarProvider>
            <Toaster richColors position="top-right" />
            <AppSidebar />
            <main className="flex-1">
              <Container>
                <AppNavbar />
                {children}
              </Container>
            </main>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
