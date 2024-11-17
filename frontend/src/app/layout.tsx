import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import { UserProvider } from "@/context/UserContext";
import { Toaster } from "@/components/ui/sonner";
import { cookies } from "next/headers";
import { decodeJwtToken } from "@/lib/utils";

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
  title: "Turistando Ceará",
  description: "Passeie pelo Ceará com os melhores veículos!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const token = cookies().get('token')?.value
  const decodedToken = token && decodeJwtToken(token)
  const user = decodedToken && typeof decodedToken === "object" && "user" in decodedToken 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (decodedToken as any).user 
    : null;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex items-start justify-between`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <UserProvider initialUser={user}>
            <main className="w-full h-full">{children}</main>
            <Toaster />
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
