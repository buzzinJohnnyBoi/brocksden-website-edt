import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Brocksden Museum',
  description: 'Offical Brocksden Museum Website',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{overflowX: "hidden"}} className={inter.className}>{children}</body>
    </html>
  )
}
