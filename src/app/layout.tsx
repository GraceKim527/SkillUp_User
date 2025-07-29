import './styles/global.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Skill Up Front',
  description: 'Skill up with Next.js',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  )
}