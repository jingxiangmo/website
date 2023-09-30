import 'tailwindcss/tailwind.css'

// @ts-ignore
import styles from "styles/index.scss"
import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';

const font = Manrope({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jingxiang mo',
  description: 'Jingxiang Mo website. About, projects, posts, research, designs.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={font.className}
    >
      <body className={styles}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
