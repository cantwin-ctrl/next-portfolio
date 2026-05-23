import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vk · Present Day, Present Time",
  description: "Electronic Engineering student by day, tinkerer in the Wired by night. ESP32, RF, Linux, embedded systems. Close the world, Open the nExt.",
  openGraph: {
    title: "Vk · Present Day, Present Time",
    description: "Building things that blink, beep, and occasionally catch fire. Close the world, Open the nExt.",
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
      <body>
        {children}
      </body>
    </html>
  );
}
