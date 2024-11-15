import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import { UserProvider } from "@/context/UserContext";

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

  const user = {
    id: '1',
    name: "Artur",
    email: "arturbartonelli@gmail.com",
    isAdmin: true,
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex items-start justify-between`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <UserProvider initialUser={user}>
            <main className="w-full h-full">{children}</main>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
