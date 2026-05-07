import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const stem = localFont({
  src: [
    { path: '../public/fonts/stem_light.ttf',          weight: '300', style: 'normal' },
    { path: '../public/fonts/stem_light-italic.ttf',   weight: '300', style: 'italic' },
    { path: '../public/fonts/stem_medium.ttf',         weight: '400', style: 'normal' },
    { path: '../public/fonts/stem_medium-italic.ttf',  weight: '400', style: 'italic' },
    { path: '../public/fonts/stem_bold.ttf',           weight: '700', style: 'normal' },
    { path: '../public/fonts/stem_bold-italic.ttf',    weight: '700', style: 'italic' },
  ],
  variable: '--font-stem',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'eCards — База знаний',
  description: 'Полная документация и FAQ по сервису виртуальных карт eCards',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={stem.variable} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
