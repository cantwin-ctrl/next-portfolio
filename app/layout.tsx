import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vk · Tinkerer & Builder",
  description: "Electronic Engineering student by day, tinkerer by night. ESP32, RF, Linux, embedded systems.",
  openGraph: {
    title: "Vk · Tinkerer & Builder",
    description: "Building things that blink, beep, and occasionally catch fire.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-green-400 font-mono antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
