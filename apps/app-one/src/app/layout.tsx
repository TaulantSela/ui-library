import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Acme Dashboard",
  description: "Acme internal dashboard — blue theme",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
