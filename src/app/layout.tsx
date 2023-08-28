import './globals.scss'
import type { Metadata } from 'next'
import localFont from 'next/font/local'

const font = localFont({
  src: [

    {
      path: '../../public/font/AppleGaramond.ttf',
      weight: '400',
      style: 'normal',
    }
  ]
})

export const metadata: Metadata = {
  title: 'Jingxiang mo',
  description: 'Jingxiang Mo website. About, photos, projects.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
