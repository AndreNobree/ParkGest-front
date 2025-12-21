import "./globals.css";

import { Metadata } from "next";

import Register from "./register/page";

export const metadata: Metadata = {
  title: 'ParkGest',
  description: 'Sistema de gerenciamento de estacionamentos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`antialiased`}
      >
        
        {/* <Register/> */}
        {children}
      </body>
    </html>
  );
}