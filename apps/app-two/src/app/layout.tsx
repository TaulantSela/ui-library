import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Bloom Settings",
  description: "Bloom Studio settings — violet theme",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
